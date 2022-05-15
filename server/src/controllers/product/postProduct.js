module.exports=async (req, res) => {
	try {
		let header={
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.TOKEN}`,
			},
		};
		console.log('------------------------', req.body);
		const data=await fetch(
			`${process.env.BASE_URL}/api/v2/products.json`,
			header, req.body
		);
		console.log(data);
		const products=await data.json();
		return res.status(200).json({products});
	} catch(error) {
		return res.status(500).json({message: "Failed to fetch"});
	}
};
