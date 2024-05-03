exports.getDiceRollResult = async (req, res) => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  res.json({ dice1, dice2 });
};
