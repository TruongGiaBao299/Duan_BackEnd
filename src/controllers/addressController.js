const { getDistrictAndWardService, getAllDistrictAndWardService } = require("../services/addressService");

const getDistrictAndWard = async (req, res) => {
  const { cityCode } = req.params; // Lấy mã tỉnh/thành phố từ URL

  try {
    const data = await getDistrictAndWardService(cityCode);
    res.status(200).json(data); // Gửi dữ liệu về client
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch district and ward data" });
  }
};

const getAllDistrictAndWard = async (req, res) => {
  try {
    const data = await getAllDistrictAndWardService();
    res.status(200).json(data); // Gửi dữ liệu về client
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch district and ward data" });
  }
};

module.exports = { getDistrictAndWard, getAllDistrictAndWard };
