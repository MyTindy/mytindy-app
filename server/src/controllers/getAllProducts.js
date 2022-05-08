module.exports = async (_req, res) => {
  try {
    let header = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };
    const data = await fetch(
      `${process.env.BASE_URL}/api/v2/products.json`,
      header
    );
    const products = await data.json();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch" });
  }
};
