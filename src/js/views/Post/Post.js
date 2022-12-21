
import React, { useState, Fragment, useEffect, memo } from "react"
import { Row, Col, Table, Card, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap"
import { createUltimatePagination } from "react-ultimate-pagination";
import { Collapse } from 'reactstrap';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import {matchSorter} from 'match-sorter';
import moment from 'moment'
import "../../../styles/tableData.css"
import CreateEventModal from "../../components/CreateEventModal";
import PostAdd from "./PostAdd";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import ShowDetailsModal from "../../components/ShowDetailsModal";
import PostView from "./PostView";
import { RecentPostAction } from "../../actions/postAction";
import { GetCategoryAction } from "../../actions/categoryAction";
import { GetSubCategoryAction } from "../../actions/subcategoryAction";
import { connect } from 'react-redux'


const todosPerPage = 5;
const setlectOption = ["created by","partner key"]
const ButtonPagination = ({ value, isActive, disabled, onClick, className }) => (
    <button
        style={isActive ? { backgroundColor: '#6867b3', color: '#ffffff' } : null}
        onClick={onClick}
        disabled={disabled}
        className={className + " custom-pagination-tab"}
    >
        {value}
    </button>
);
const PaginatedPage = createUltimatePagination({
  itemTypeToComponent: {
      PAGE: ButtonPagination,
      ELLIPSIS: () => <ButtonPagination value="..." />,
      FIRST_PAGE_LINK: () => <ButtonPagination value="First" className="hide-button" />,
      PREVIOUS_PAGE_LINK: () => <ButtonPagination value="Prev" className="hide-button" />,
      NEXT_PAGE_LINK: () => <ButtonPagination value="Next" className="hide-button" />,
      LAST_PAGE_LINK: () => <ButtonPagination value="Last" className="hide-button" />
  }
});
const dummydata=[{
    "id": 1,
    "title": "Freddy",
    "description": "Gledhill",
    "media": "imgur.com",
    "created_at": "12/9/2021",
    "updated_at": "8/31/2022",
    "category_id": "63bf77e1-6ffb-4232-853d-6fdd676cb98f",
    "subcategory_id": "63e31824-2688-4597-9f72-b5195f1e01d2",
    "city": "Bouarouss",
    "map_link": "Photobean",
    "travel_awaits": "Geba",
    "multiple_image": "Gabspot"
  }, {
    "id": 2,
    "title": "Dora",
    "description": "Klausen",
    "media": "liveinternet.ru",
    "created_at": "8/12/2022",
    "updated_at": "4/25/2022",
    "category_id": "fbb61f4b-477c-4e91-a3e9-d6bab63c2296",
    "subcategory_id": "37cc5fc1-d1e8-40d9-9c41-8a7711f326ba",
    "city": "Jibu Hulangtu",
    "map_link": "Livefish",
    "travel_awaits": "Jabbercube",
    "multiple_image": "Leenti"
  }, {
    "id": 3,
    "title": "Emmery",
    "description": "Overton",
    "media": "shop-pro.jp",
    "created_at": "8/1/2022",
    "updated_at": "5/23/2022",
    "category_id": "7c3b760a-58e5-4f94-8c4a-458c271dc92a",
    "subcategory_id": "143cedb6-3401-4cd6-a3bf-5dc12f3b14aa",
    "city": "Lubango",
    "map_link": "Jabbertype",
    "travel_awaits": "Geba",
    "multiple_image": "Avavee"
  }, {
    "id": 4,
    "title": "Gaven",
    "description": "Claasen",
    "media": "aol.com",
    "created_at": "4/17/2022",
    "updated_at": "3/24/2022",
    "category_id": "b172af99-db76-423e-ab52-0e80daad2df9",
    "subcategory_id": "e4eb7f5d-aedd-4715-a38c-2ef0c91aafad",
    "city": "Niulanshan",
    "map_link": "Yakitri",
    "travel_awaits": "Oyonder",
    "multiple_image": "Zoomzone"
  }, {
    "id": 5,
    "title": "Haleigh",
    "description": "Feake",
    "media": "china.com.cn",
    "created_at": "9/12/2022",
    "updated_at": "4/6/2022",
    "category_id": "e220816f-f06f-4b02-b6ca-266b8dd5d7f3",
    "subcategory_id": "f77d3cf7-daa7-43fa-98d8-58d2852297d2",
    "city": "Jinghai",
    "map_link": "Roomm",
    "travel_awaits": "Meevee",
    "multiple_image": "Brainlounge"
  }, {
    "id": 6,
    "title": "Anallese",
    "description": "Dunn",
    "media": "fastcompany.com",
    "created_at": "8/15/2022",
    "updated_at": "9/2/2022",
    "category_id": "d62826e2-9130-470e-9e5f-32df637916fb",
    "subcategory_id": "13af9660-775b-45cb-84ea-91aaadda73dc",
    "city": "Bimbo",
    "map_link": "Demivee",
    "travel_awaits": "Skinte",
    "multiple_image": "Voonyx"
  }, {
    "id": 7,
    "title": "Mathew",
    "description": "holmes",
    "media": "pagesperso-orange.fr",
    "created_at": "1/26/2022",
    "updated_at": "12/2/2022",
    "category_id": "b40c5838-319b-4ce0-93d2-8e2d7be16d7f",
    "subcategory_id": "ee9b9b9b-46b6-494e-a46b-c62572257b90",
    "city": "Huping",
    "map_link": "Meedoo",
    "travel_awaits": "Jabberstorm",
    "multiple_image": "Linkbuzz"
  }, {
    "id": 8,
    "title": "Myrvyn",
    "description": "Averill",
    "media": "samsung.com",
    "created_at": "12/4/2022",
    "updated_at": "10/21/2022",
    "category_id": "72e98ffd-8485-4081-beed-ccda95f4d96f",
    "subcategory_id": "0a19a4a8-b365-40e9-a9f3-cfe2d0d534e4",
    "city": "Akunk’",
    "map_link": "Jabbersphere",
    "travel_awaits": "Brainverse",
    "multiple_image": "Plajo"
  }, {
    "id": 9,
    "title": "Derry",
    "description": "Millions",
    "media": "npr.org",
    "created_at": "7/22/2022",
    "updated_at": "4/28/2022",
    "category_id": "e278e346-26a2-4738-b274-f4f0d7c333a2",
    "subcategory_id": "4876f4fa-3dab-4520-88c4-07d6fc5effe0",
    "city": "Balqash",
    "map_link": "Gigabox",
    "travel_awaits": "Skaboo",
    "multiple_image": "Devpoint"
  }, {
    "id": 10,
    "title": "Shaylah",
    "description": "Ferenczy",
    "media": "cmu.edu",
    "created_at": "3/12/2022",
    "updated_at": "2/8/2022",
    "category_id": "c785d4c0-9255-4c7a-83dc-0d3a23bbc007",
    "subcategory_id": "8803aa19-75a2-4f79-807f-0760cd9378bc",
    "city": "Tampa",
    "map_link": "Twinte",
    "travel_awaits": "Buzzdog",
    "multiple_image": "Lajo"
  }, {
    "id": 11,
    "title": "Colly",
    "description": "Milvarnie",
    "media": "sbwire.com",
    "created_at": "6/5/2022",
    "updated_at": "3/23/2022",
    "category_id": "a0362078-b052-4def-b1a6-c45a9b0e3b54",
    "subcategory_id": "28b9d2e0-0277-4766-bb5e-8536e1212e58",
    "city": "Shouxihu",
    "map_link": "Cogibox",
    "travel_awaits": "Yakijo",
    "multiple_image": "Flipbug"
  }, {
    "id": 12,
    "title": "Donny",
    "description": "Guidetti",
    "media": "icio.us",
    "created_at": "11/5/2022",
    "updated_at": "8/8/2022",
    "category_id": "b8383d0d-77e5-4cfc-9c2a-71cf4db43254",
    "subcategory_id": "c99706d4-5ee7-4abd-b9e6-78805d77fc83",
    "city": "Vallegrande",
    "map_link": "Skalith",
    "travel_awaits": "Wordpedia",
    "multiple_image": "Zoombox"
  }, {
    "id": 13,
    "title": "Hy",
    "description": "Albutt",
    "media": "dyndns.org",
    "created_at": "4/18/2022",
    "updated_at": "5/19/2022",
    "category_id": "98967eb9-8ebb-4763-89c9-8c74511e5441",
    "subcategory_id": "1361f8d5-ab25-430d-b376-2c5e1ec8c692",
    "city": "Sirnasari",
    "map_link": "Avamba",
    "travel_awaits": "Wordtune",
    "multiple_image": "Shuffletag"
  }, {
    "id": 14,
    "title": "Mylo",
    "description": "Neild",
    "media": "diigo.com",
    "created_at": "11/28/2022",
    "updated_at": "7/29/2022",
    "category_id": "460d005e-557a-4cab-8773-0e1828af71a6",
    "subcategory_id": "98d6d4b0-c5a8-4063-a0b5-4208b73d8ef6",
    "city": "Benito Juarez",
    "map_link": "Fadeo",
    "travel_awaits": "Twitternation",
    "multiple_image": "Skipstorm"
  }, {
    "id": 15,
    "title": "Verney",
    "description": "Leale",
    "media": "wisc.edu",
    "created_at": "7/11/2022",
    "updated_at": "10/15/2022",
    "category_id": "8ebb88d4-66ba-4e93-9caf-0743c7672d41",
    "subcategory_id": "24a327a3-0682-47c8-b606-0d01993f9ca0",
    "city": "Yixingfu",
    "map_link": "Flipbug",
    "travel_awaits": "Dabtype",
    "multiple_image": "Yata"
  }, {
    "id": 16,
    "title": "Lothario",
    "description": "Saines",
    "media": "mlb.com",
    "created_at": "8/7/2022",
    "updated_at": "3/6/2022",
    "category_id": "b0d5b810-4401-4af8-b956-ca66da456819",
    "subcategory_id": "0461cd8e-9027-413e-8631-f021ef76b34e",
    "city": "Az Zulfi",
    "map_link": "Skyble",
    "travel_awaits": "Aimbu",
    "multiple_image": "Voomm"
  }, {
    "id": 17,
    "title": "Wally",
    "description": "Dodle",
    "media": "creativecommons.org",
    "created_at": "6/24/2022",
    "updated_at": "8/28/2022",
    "category_id": "0b8b0c59-9863-4cf7-bd16-65c9aa3d1352",
    "subcategory_id": "9a5dd70f-39b2-4394-8652-8809ab1f9a03",
    "city": "Nepeña",
    "map_link": "Tagfeed",
    "travel_awaits": "Voonder",
    "multiple_image": "Tanoodle"
  }, {
    "id": 18,
    "title": "Jenica",
    "description": "Do Rosario",
    "media": "yolasite.com",
    "created_at": "3/29/2022",
    "updated_at": "3/27/2022",
    "category_id": "5d83330f-ed5a-468d-84db-6d9e17bd1e5e",
    "subcategory_id": "d261a954-9e93-41bc-8409-c2814ce6b67c",
    "city": "Briceni",
    "map_link": "Yodel",
    "travel_awaits": "Topiclounge",
    "multiple_image": "Babblestorm"
  }, {
    "id": 19,
    "title": "Aindrea",
    "description": "Dalling",
    "media": "gizmodo.com",
    "created_at": "10/15/2022",
    "updated_at": "1/5/2022",
    "category_id": "c34db8f9-3148-40ff-b652-16dead635c56",
    "subcategory_id": "1cae16fd-0f26-4a13-87b7-84ff0f060993",
    "city": "Nelson",
    "map_link": "Yata",
    "travel_awaits": "Bluezoom",
    "multiple_image": "Skinix"
  }, {
    "id": 20,
    "title": "Wake",
    "description": "Stuke",
    "media": "fastcompany.com",
    "created_at": "3/3/2022",
    "updated_at": "4/20/2022",
    "category_id": "09abd57c-949e-45b5-b88c-c33a9060f45a",
    "subcategory_id": "dfec0c95-6e27-4647-9829-e6fb504c25d5",
    "city": "Shangxian",
    "map_link": "Dynava",
    "travel_awaits": "Feedmix",
    "multiple_image": "Jaloo"
  }]
const Post = (props) => {

  const { profileData=dummydata, tableClass,updateScheduleList, toggleTab, updatePartnerCampaginList,updateScheduler, permissions, isLoading } = props
  const [currentPage, setCurrentPage] = useState(0)
  const [isOpenDetail, setIsOpenDetail] = useState({
      isOpen: false,
      data: null,
      index: null
  });
  const [editModal, setEditModal] = useState({})
  const [loader, setLoader] = useState(false);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [hideViewCamp, setHideViewCamp] = useState(false);
  const [isCreatePartner, setIsCreatePartner] = useState(false);
  const [filterVal, setFilterVal] = useState([]);
  const [datePickerModal, setDatePickerModal] = useState(false)
  const [userInput, setuserInput] = useState("");
  const [dropDownValue, setdropDownValue] = useState("");
  const [currentSearch, setCurrentSearch] = useState({ key: "", value: "" })
  const [updateList, setUpdateList] = useState('')
  const [eventModal, setEventModal] = useState(false)
  const [eventDeleteModal, setEventDeleteModal] = useState(false)

  const toggleDatePickerModal = () => setDatePickerModal(!datePickerModal);
 
  // useEffect(() => {
  //     if (isOpenDetail.isOpen && profileData.length) {
  //         const payload = isOpenDetail.data.key ? isOpenDetail.data.key : profileData[profileData.length - 1].key

  //         getPartnerDetailApi(payload)
  //             .then(res => {
  //                 if (res.data.length) {
  //                     setIsOpenDetail({
  //                         ...isOpenDetail,
  //                         // isOpen: res.data.length !== 0 ? true : false,
  //                         data: res.data[0],
  //                         // index: isOpenDetail.index
  //                     });
  //                 }
  //                 // setLoader(false);
  //             })
  //             .catch(err => {
  //                 // setLoader(false);
  //                 console.log("Error caught!");
  //             })
  //     }
  // }, [profileData])
  
  // useEffect(()=>{
     
  //         setLoader(true);
  //         getScheduleApi()
  //            .then((res) => {
  //                if (typeof res.data === "object") {
  //                     updateScheduleList(res.data);
  //                } else {
  //                     updateScheduleList([]);
  //                }
  //                setLoader(false);
  //            })
  //            .catch((err) => {
  //                console.log("Error caught!",err);
  //                 updateScheduleList([]);
  //                setLoader(false);
  //            });
         
  // },[updateScheduler,updateList])

  useEffect(()=>{
    // props.AddCategory()
    if(!props?.postList?.length)
    props.RecentPostAction()

    if(!props.categoryList.length)
    props.GetCategoryAction()

    if(!props.subcategoryList.length){
        props.GetSubCategoryAction();
     }
  },[])

  const editModalHandler=(rowData)=>{
    // e.preventDefault()
    // e.stopPropagation();
    setEditModal(rowData)
    setEventModal(!eventModal)
  }
  const deleteModalHandler=(e)=>{
    e.preventDefault()
    e.stopPropagation();
    eventDeleteToggle()
  }
  const eventToggle=()=>{
    setEventModal(!eventModal)
  }
  const eventDeleteToggle=()=>{
    setEventDeleteModal(!eventDeleteModal)
  }
  const toggle = (data, index) => {
      console.log('data@@', data)
      setToggleLoader(true);
      setHideViewCamp(false);
      setIsCreatePartner(false);
      setIsOpenDetail({
                      ...isOpenDetail,
                      isOpen: true,
                      data: Object.entries(data).length ? data : null,
                      index: index
                  });
                  setToggleLoader(false);
     
  }
  // const showDetails = () => {

  //         const searchData = {
  //             "key": dropDownValue,
  //             "value": userInput
  //         }

  //         //setError({})
  //         setCurrentSearch(searchData);
  //         if (userInput && dropDownValue && dropDownValue !== "Search by...") {
  //            // setLoader(true);
  //             if(dropDownValue=='created by'){
                 
                 
  //                 getCreatedByFilterApi(userInput).then((res) => {
  //                     console.log('created by',res)
  //                 updateScheduleList(res.data);
  //                 setLoader(false);
  //                 }).catch(err => {
  //                 setLoader(false);
  //                 updateScheduleList([]);
  //                 console.log("Error caught!", err);
  //                 });
  //             }
  //             if(dropDownValue=='partner key'){
  //                 console.log('partner key')
                
  //                 getPartnerKeyFilterApi(userInput).then((res) => {
  //                     console.log('res===>', res)
  //                updateScheduleList(res.data);
  //                 setLoader(false);
  //                 }).catch(err => {
  //                 setLoader(false);
  //                 updateScheduleList([]);
  //                 console.log("Error caught!", err);
  //                 });
  //             }
              
  //         } else {
  //             updateScheduleList([]);
  //         }
  //    // }
  // }

  function DefaultColumnFilter({
      column: { filterValue, preFilteredRows, setFilter },
  }) {
      const count = preFilteredRows.length

      return (
          <input
              className="form-control col-sm-12 filter-div"
              value={filterValue || ''}
              onChange={e => {
                  setFilter(e.target.value.replace(/^\s+/,"") || undefined) // Set undefined to remove the filter entirely
              }}
              placeholder={`Search ${count} records...`}
          />
      )
  }


  function fuzzyTextFilterFn(rows, id, filterValue) {
      return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  function FilterTable({
      columns,
      data,
      setCurrentPage,
      currentPage,
      filterVal,
      setFilterVal, }) 
      {
      const filterTypes = React.useMemo(
          () => ({
              // Add a new fuzzyTextFilterFn filter type.
              fuzzyText: fuzzyTextFilterFn,
              // Or, override the default text filter to use
              // "startWith"
              text: (rows, id, filterValue) => {
                  return rows.filter(row => {
                      const rowValue = row.values[id]
                      return rowValue !== undefined
                          ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                          : true
                  })
              },
          }),
          []
      )

      const defaultColumn = React.useMemo(
          () => ({
              // Let's set up our default Filter UI
              Filter: DefaultColumnFilter,
          }),
          []
      )

      const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
          page, // Instead of using 'rows', we'll use page,
          // which has only the rows for the active page

          // The rest of these things are super handy, too ;)
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
         // setFilter,
          state: { pageIndex, pageSize, filters },
      } = useTable(
          {
              columns,
              data,
              defaultColumn, // Be sure to pass the defaultColumn option
              filterTypes,
              autoResetRowState: false,
              autoResetPage: false,
              autoResetFilters: false,
              initialState: { pageIndex: currentPage, pageSize: 5, filters: filterVal },
             // setFilter,
          },
          useFilters, // useFilters!
          useSortBy,
          usePagination,
      )

      useEffect(() => {
          if (filters.length) {
              // setCurrentPage(0);
              // gotoPage(0)
              filters.map((val) => {
                 // setFilter(val.id, val.value);
              });
          }
      }, [])
   
      // We don't want to render all of the rows for this example, so cap
      // it for this use case

      // const firstPageRows = rows.slice(currentPage * 5 - 5, currentPage * 5);

      return (
          <div>
           
             
              <div className="row">

                 <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                 <h1 class="Profiles-title">Post Details</h1>
                 </div>
                 <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                 <button type="button" class="secondary-btn btn btn-secondary" onClick={eventToggle}>Create Post</button>
                 </div>
              </div>
              <Table bordered={false} hover size="sm" responsive {...getTableProps()} className="partnerList">
                  <thead>
                      {headerGroups.filter((data, index) => index > 0).map(headerGroup => (
                          <tr className="table-header table-pointer" {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map(column => (
                                  <th className="table-heading"   {...column.getHeaderProps({
                                      style: { width: column.width },
                                  })}>
                                      <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                          {column.render('Header')}
                                          <span className="sort-div">
                                              {column.isSorted
                                                  ? column.isSortedDesc
                                                      ? <i className="fas fa-sort-amount-up-alt" aria-hidden="true"></i>
                                                      : <i className="fas fa-sort-amount-down-alt" aria-hidden="true"></i>
                                                  : <i className="fa fa-sort" aria-hidden="true"></i>}
                                          </span>
                                      </div>
                                      {/* Render the columns filter UI */}
                                      <div className="table-box">{column.canFilter ? column.render('Filter') : null}</div>
                                  </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  {
                      page && page.length ? 
                          <tbody {...getTableBodyProps()}>
                              {page.map((row, i) => {
                                  prepareRow(row)
                                  return (
                                      <tr onClick={() => {
                                          setCurrentPage(currentPage);

                                          if (filters.length) {
                                              setFilterVal(filters);
                                          }
                                          else {
                                              setFilterVal([])
                                          }
                                          toggle(row, i, false)
                                      }} style={{ cursor: 'pointer' }} className={`listing-tr ${isOpenDetail.isOpen && isOpenDetail.i === i ? "activeRow" : ""}`} {...row.getRowProps()}>
                                          {row.cells.map(cell => {
                                              return <td className="filter-div" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                          })}
                                      </tr>
                                  )
                              })}
                          </tbody>
                          : <tbody>
                              <Card style={{ width: '130%', border:"none" }}>
                                  <h5>No results found</h5>
                              </Card>
                          </tbody>

                  }
              </Table>
              {page && page.length ?
                  <div>
                      {pageItemCount(null, pageIndex + 1)}
                      <Pagination aria-label="Page navigation example" className="custom-pagination">
                          <PaginationItem>
                              <PaginationLink previous onClick={() => {
                                  previousPage();
                                  if (canPreviousPage) {
                                      setCurrentPage(currentPage - 1);
                                      if (filters.length) {
                                          setFilterVal(filters);
                                      }
                                      else {
                                          setFilterVal([])
                                      }
                                  }
                              }} disabled={!canPreviousPage} style={{ cursor: pageIndex === 0 ? 'no-drop' : 'pointer' }} />
                          </PaginationItem>

                          <PaginatedPage
                              totalPages={pageOptions.length}
                              currentPage={pageOptions.length === 0 ? 0 : pageOptions.length <= pageIndex ? gotoPage(0) : pageIndex + 1}
                              onChange={page => {
                                  setCurrentPage(page - 1);

                                  if (filters.length) {
                                      setFilterVal(filters);
                                  }
                                  else {
                                      setFilterVal([])
                                  }
                                  gotoPage(page - 1)
                              }}
                          />
                          <PaginationItem>
                              <PaginationLink next onClick={() => {
                                  if (canNextPage) {
                                      if (pageOptions.length <= currentPage) {
                                          gotoPage(1)
                                          setCurrentPage(1)
                                      } else {
                                          setCurrentPage(currentPage + 1);
                                      }

                                      if (filters.length) {
                                          setFilterVal(filters);
                                      }
                                      else {
                                          setFilterVal([])
                                      }
                                  }
                                  nextPage();
                              }} disabled={!canNextPage} style={{ cursor: !canNextPage ? 'no-drop' : 'pointer' }} />
                          </PaginationItem>
                      </Pagination>
                  </div>
              :null}
          </div>
      )
  }

  const OptimizedComponent = memo(FilterTable)

  const handleClickNext = (value) => {
      const count = currentPage + 1
      if (currentPage !== value) {
          setCurrentPage(count)
      }
  }

  const handleClickPrevious = (value) => {
      const count = currentPage - 1
      if (currentPage !== value) {
          setCurrentPage(count)
      }
  }


  // Logic for pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  let scheduleList=[...profileData]
  let scheduleLists=[];
  scheduleList.map((e)=>{
  scheduleLists.push({...e,['scheduledAt']:moment(e.scheduledAt).format('MMMM Do YYYY, h:mm:ss a')})})
   console.log('scheduleData@@@' ,scheduleLists)
  const currentProfileList = scheduleLists;
  // Logic for displaying page numbers
  const pageNumbers = []; 

  if (profileData.length !== 0) {
      for (let i = 1; i <= Math.ceil(profileData.length / todosPerPage); i++) {
          pageNumbers.push(i);
      }
  }

  const pageItemCount = (className, pageIndex) => {
      // 1-10 of 13
      return (
          <div className={"page-item-count " + className}>
              <div className="count-value">{(pageIndex === 1 ? 1 : (pageIndex - 1) * 5) + " - " + pageIndex * 5 + " of " + profileData.length}</div>
          </div>
      )
  }
  const handleDatePicker=(e,id)=>{
     e.stopPropagation()
    toggleDatePickerModal()
  }
  const columns = React.useMemo(
      () => [
          {
              Header: "Profile List",
              columns: [
                 
                  
                  {
                      Header: "Title",
                      accessor: "title",
                      filter: "fuzzyText"
                  },
                  {
                      Header: "Media",
                      accessor: "media",
                      filter: "fuzzyText"
                     
                  },
                  {
                    Header: "City",
                    accessor: "city",
                    filter: "fuzzyText"
                   
                },
                {
                  Header: "Map Link",
                  accessor: "map_link",
                  filter: "fuzzyText"
                },
              {
                Header:"Action",
                accessor: (originalRow) => (<div className="action-wrp">
                  <div className='trash-btn'><i className="fa fa-edit" onClick={()=>editModalHandler(originalRow)}></i></div>
                  <div onClick={(e) => {
                    deleteModalHandler(e)
                  //e.stopPropagation();
                 // toggleModal(!modal);
                 // setDeletePayload({ ...deletePayload, key: [originalRow.key] });
              }} className='trash-btn'><i className="fa fa-trash"></i></div></div>),
              disableFilters: true
              }
                  
              ]
          }
      ],
      []
  );

  return (
      <div className={tableClass}>
         
          {toggleLoader ? <div className="loader-style" > loading... </div> : null}
         
          
          {(loader || isLoading) ? <div className="loader-style" style={{ position: 'relative' }}> loading... </div> :
              <Row>

                  <Col>
                      {(currentProfileList.length)
                          ? <OptimizedComponent
                              columns={columns}
                              data={currentProfileList}
                              currentPage={currentPage}
                              setCurrentPage={setCurrentPage}
                              filterVal={filterVal}
                              setFilterVal={setFilterVal} />
                          : <Card className="empty-box">
                              <h5>No results found</h5>
                          </Card>}

                  </Col>
              </Row>
          }
         
          <Row>
              <Col>
                  <Table>
                     { console.log('isOpenDetail@@',isOpenDetail )}
                      {isOpenDetail.isOpen && isOpenDetail.data ?
                          <tbody>
                              <tr className="detail-box">
                                  <td colSpan="6" className="details-div">
                                      <Collapse isOpen={isOpenDetail.isOpen}>
                                          <Fragment>
                                          <PostView data={isOpenDetail.data} closeDetails={() => setIsOpenDetail({...isOpenDetail, isOpen: false})}/>
                                                  {/* <ScheduleDetails data={isOpenDetail.data} closeDetails={() => setIsOpenDetail({...isOpenDetail, isOpen: false})} allData={profileData} updateData={(data)=>setUpdateList(data)}/> */}
                                          </Fragment>
                                      </Collapse>
                                  </td>
                              </tr>
                          </tbody>
                          : null
                      }
                  </Table>
              </Col>
          </Row>

          {eventModal && <PostAdd data={editModal} showModalEvent={eventModal} toggleEvent={eventToggle}/>}
          {eventDeleteModal && <DeleteConfirmModal showModalEvent={eventDeleteToggle} toggleEvent={eventDeleteToggle}/>}

      </div>
  )
}

// export default Post

const mapStateToProps = state =>{
   
    const {postList,postLoader}  = state.postReducer;
    const {categoryList}  = state.categoryReducer;
    const {subcategoryList}  = state.subcategoryReducer;
    return {postList,postLoader,subcategoryList,categoryList};
  }
  export default connect(mapStateToProps,{RecentPostAction,GetCategoryAction,GetSubCategoryAction})(Post);
  