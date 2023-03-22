function arrangeData(data) {
    if (Object.keys(data[0]).length === 0) return [];
    const nestArr = [];
    for (let i = 0; i < data.length; i++) {
      nestArr.push(Object.values(data[i]));
    }
    return nestArr;
  }

module.exports = {arrangeData}