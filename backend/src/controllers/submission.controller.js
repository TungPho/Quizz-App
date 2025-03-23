const SubmissionService = require("../services/submission.service");

class SubmissionController {
  // hàm này review lại test của 1 user
  // : Dùng cho học sinh review lại submission của mình
  // : Dùng cho test history của giáo viên, xem kết quả của học sinh
  // : Gvien xem được: số câu sai, số câu đúng, vị trí sai và đúng, điểm.... và lập thống kê cả lớp
  getAllSubmisionByUserId = async (req, res, next) => {
    const { id } = req.params;
    const results = await SubmissionService.getAllSubmisionByUserId(id);
    return res.status(200).json({
      metadata: results,
      mesage: "Get all user's submission successfully",
    });
  };
  // TODO: check nếu user đã submit, trả về thông báo bạn đã submit bài này rồi!
  // ghi lại số phòng khi submit, thời điểm khi submit
  // chỉ cần check trong csdl đã có submission cho quizID này chưa, nếu có rồi thì thôi!
  createSumission = async (req, res, next) => {
    const {
      testId,
      userId,
      answers,
      score,
      submitted_at,
      number_of_correct_options,
      number_of_wrong_options,
      roomId,
    } = req.body;
    console.log(req.body);
    const newSubmisson = await SubmissionService.createSubmission({
      testId,
      userId,
      answers,
      score,
      submitted_at,
      number_of_correct_options,
      number_of_wrong_options,
      roomId,
    });
    return res.status(200).json({
      metatdata: newSubmisson,
      mesage: "Create a new submission successfully",
    });
  };
}

module.exports = new SubmissionController();
