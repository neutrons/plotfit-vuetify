export default (to, from, next) => {
  // if query editData is non-existent or empty navigate back
  if (typeof to.query.editChartData === 'undefined' || to.query.editChartData.length === 0) {
    next('/');
  } else {
    next();
  }
};
