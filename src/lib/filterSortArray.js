//search accoding to all criteria in sort, filter etc
import _ from 'lodash';

const filterSortArray = (state) => {
  const { parsedUrlQuery, sortBy, sortDirection, query, minPrice, maxPrice } = state;

  //1) render only the category and type selected in navbar
  let filtered = _.filter(state.items, parsedUrlQuery );

  //1) sort items in asc or desc order
  filtered = _.orderBy(filtered, [sortBy], [sortDirection] );

  //2) search on brand and product description with query string
  //create new regex to test seach query on brand name and product description
  const regex = new RegExp(query, 'i'); //case insensitive
  filtered = _.filter(filtered, (item) => regex.test(item.brand) || regex.test(item.shortDescription));

  //3) filter by price
  filtered = _.filter(filtered, (item) => item.rentalPrice >= parseInt(minPrice) && item.rentalPrice <= parseInt(maxPrice));

  //4) filter with checkboxes - extract criteria set at true - TO REFACTOR !!
  const filterCriteria = _.filter(Object.keys(state.filter), (criterion) => state.filter[criterion] === true );
  const filterCriteriaColor = _.filter(Object.keys(state.filterColor), (criterion) => state.filterColor[criterion] === true );
  //only filter if at least one checkbox is checked, otherwise no result displayed...
  if(filterCriteria.length === 0 && filterCriteriaColor.length === 0) return filtered;
  //filter items that have occasions or colors including at least one filter criterion
  filtered = _.filter(filtered, (item) => item.occasion.some(elt => filterCriteria.includes(elt)) || item.colors.some(elt => filterCriteriaColor.includes(elt)));

  return filtered;
};

export default filterSortArray;
