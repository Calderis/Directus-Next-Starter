module.exports = {
  /** Set score, percent and color to password level
   * @Param String, password
   * @Return { color, percent, title, message }
   */
  score: function (password) {
    let percent = 100 * password.length / 20;
    let color = "";
    let title = "";
    let message = "";

    if (percent > 100) percent = 100;

    if (percent < 40) {
      title = "Weak password";
      message = "Come on, you can do better ...";
      color = "bg-red-500";
    } else if (percent < 70) {
      title = "Correct password";
      message = "We're not far from what should be a real password.";
      color = "bg-yellow-500";
    } else if (percent < 90) {
      title = "Strong password";
      message = "A true password ! We're safe.";
      color = "bg-green-500";
    } else {
      title = "Strong password";
      message = "Make password great again ! 🔥🔥🔥";
      color = "bg-gradient-to-r from-green-300 via-green-400 to-green-500 animate-pulse";
    }

    return { title, message, color, percent };
  }
}
