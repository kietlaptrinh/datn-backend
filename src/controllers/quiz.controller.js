import models from '../models/index.js'; 
const { Question, QuizResult, User } = models;

export const listQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [['createdAt', 'DESC']] // Sắp xếp câu mới nhất lên đầu
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    // Validate
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: 'Thiếu thông tin câu hỏi, đáp án hoặc đáp án đúng.' });
    }
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ message: 'Đáp án phải là một mảng 4 phần tử.' });
    }

    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};


export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer } = req.body;

    const q = await models.Question.findByPk(id);
    if (!q) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi.' });
    }

    if (!question || !Array.isArray(options) || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    await q.update({
      question,
      options,
      correctAnswer
    });

    res.json(q);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi.' });
    }

    await question.destroy();
    res.json({ message: 'Đã xóa câu hỏi.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

export const saveResult = async (req, res) => {
  try {
    // Lấy userId từ session (req.user) do Passport cung cấp
    const userId = req.user?.id; 
    const { score, totalQuestions } = req.body;

    if (!userId) return res.status(401).json({ message: "Chưa đăng nhập" });

    await QuizResult.create({ userId, score, totalQuestions });
    res.json({ message: "Lưu kết quả thành công" });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lưu điểm', error: error.message });
  }
};

//  Lấy lịch sử làm bài của User đang đăng nhập
export const getMyHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Chưa đăng nhập" });

    const history = await QuizResult.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // Mới nhất lên đầu
      limit: 20
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy lịch sử', error: error.message });
  }
};

// Bảng xếp hạng (Top 10 điểm cao nhất toàn server)
export const getLeaderboard = async (req, res) => {
  try {
    const allHighScores = await QuizResult.findAll({
      attributes: ['score', 'totalQuestions', 'createdAt', 'userId'], 
      include: [
        { 
          model: User, 
          as: 'user', 
          attributes: ['username', 'avatar'] 
        }
      ],
      // Sắp xếp điểm cao nhất lên đầu
      order: [['score', 'DESC'], ['createdAt', 'ASC']], 
      limit: 50 
    });


    const uniqueLeaderboard = [];
    const seenUserIds = new Set();

    for (const result of allHighScores) {
      if (!seenUserIds.has(result.userId)) {
        uniqueLeaderboard.push(result);
        seenUserIds.add(result.userId);
      }
      
      // Chỉ lấy đúng 10 người đứng đầu
      if (uniqueLeaderboard.length === 10) break;
    }

    res.json(uniqueLeaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy BXH', error: error.message });
  }
};