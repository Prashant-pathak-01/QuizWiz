import Student from "./../Models/Student.js";

export const addStudent = async (req, res) => {
  try {
    const email = req.body.email;
    const user = Student.findOne({ email: email });
    if (user)
      return res
        .status(201)
        .json({ message: "User with this email already exist" });
    user = new Student(req.body);
    let output = user.save();
    return res.status(200).json({ message: output });
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email: email });

    if (!user) {
      return res
        .status(203)
        .json({ message: "User with this email does not exist" });
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
     return res.status(400).json({ message: "Password not matched" });
    }
    return res.status(200).json({ ...user });
   catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};
