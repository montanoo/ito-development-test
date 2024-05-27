import database from "../utils/database";

async function getBaseInfo() {
  const [genres, authors] = await Promise.all([
    database.genre.findMany(),
    database.author.findMany(),
  ]);

  return { genres, authors };
}

export default { getBaseInfo };
