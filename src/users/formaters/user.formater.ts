export const userFormater = (userData: any) => ({
  userId: userData._id,
  username: userData.username,
  email: userData.email,
  picture: userData.picture || null,
  score: userData.score || 0,
  rank: userData.rank || 0,
  badges: userData.badges || [],
  coinsBonus: userData.coinsBonus || 0,
});
