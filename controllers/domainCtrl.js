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
    const page = Number(req.query.page) || 1;
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
    const totalPages = Math.ceil(count / pageSize);

    pages = [];
    pageNum = 5; // odd
    if (pageNum % 2 != 1) pageNum += 1;
    if (totalPages < pageNum) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = -((pageNum - 1) / 2); i <= (pageNum - 1) / 2; i++) {
        pages.push(page + i);
      }
      while (pages[0] < 1) {
        pages = pages.map((e) => e + 1);
      }
      while (pages[pages.length - 1] > totalPages) {
        pages = pages.map((e) => e - 1);
      }
    }
    console.log({ domainLists, page, totalPages, pages });
    return res.json({ domainLists, page, totalPages, pages });
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
