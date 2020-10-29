const Domain = require("../models/domainModel");

const domainCtrl = {
  getDomains: async (req, res) => {
    const keyword = req.query.keyword
      ? {
          domainName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sortField
      ? {
          [req.query.sortField]: req.query.sortDirection || 1,
        }
      : {};
    const count = await Domain.countDocuments({ ...keyword });
    // const domainLists = await Domain.find({ ...keyword })
    const domainLists = await Domain.find({ ...keyword }, null, {
      sort,
      limit: pageSize,
      skip: pageSize * (page - 1),
    });

    return res.json({ domainLists, page, pages: Math.ceil(count / pageSize) });
  },
  createDomain: async (req, res) => {
    try {
      const { domainName, apiKey, emailLimit, status } = req.body;
      const domain = new Domain({
        domainName,
        apiKey,
        emailLimit,
        status,
      });
      await domain.save();
      res.json({ msg: "Created a Domain" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = domainCtrl;
