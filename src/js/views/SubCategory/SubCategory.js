
import React, { useState, Fragment, useEffect, memo } from "react"
import { Row, Col, Table, Card, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap"
import { createUltimatePagination } from "react-ultimate-pagination";
import { Collapse } from 'reactstrap';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import {matchSorter} from 'match-sorter';
import moment from 'moment'
import "../../../styles/tableData.css"
import CreateEventModal from "../../components/CreateEventModal";
import SubCategoryAdd from "./SubCategoryAdd";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import ShowDetailsModal from "../../components/ShowDetailsModal";
import SubCategoryView from "./SubCategoryView";

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
    "name": "Hugues",
    "image": "Eastes",
    "status": true,
    "created_at": "12/25/2021",
    "updated_at": "6/26/2022",
    "category_id": "b88170c8-1cbb-47c6-86b6-004ca00eeafb",
    "is_video": "Weber-Farrell"
  }, {
    "id": 2,
    "name": "Bianca",
    "image": "Cardello",
    "status": false,
    "created_at": "6/25/2022",
    "updated_at": "10/20/2022",
    "category_id": "48a40ca6-e5a4-44c4-b9aa-7719fc318893",
    "is_video": "Schoen, Maggio and Frami"
  }, {
    "id": 3,
    "name": "Gwyneth",
    "image": "Turbill",
    "status": false,
    "created_at": "7/17/2022",
    "updated_at": "3/30/2022",
    "category_id": "6ef33f33-41ce-4024-8962-36173e722d15",
    "is_video": "Oberbrunner, Wuckert and Weimann"
  }, {
    "id": 4,
    "name": "Jamie",
    "image": "Rahl",
    "status": false,
    "created_at": "5/5/2022",
    "updated_at": "3/8/2022",
    "category_id": "eebe421a-bb10-4ae8-866f-464bcece56ee",
    "is_video": "Stokes, Deckow and Witting"
  }, {
    "id": 5,
    "name": "Didi",
    "image": "Skocroft",
    "status": true,
    "created_at": "1/17/2022",
    "updated_at": "2/21/2022",
    "category_id": "143f6375-9d8c-4308-8382-10ad1811c478",
    "is_video": "Larkin Group"
  }, {
    "id": 6,
    "name": "Darrell",
    "image": "Smaling",
    "status": true,
    "created_at": "7/29/2022",
    "updated_at": "7/23/2022",
    "category_id": "7a517b34-d3c8-489b-bb02-9720feb87af0",
    "is_video": "Prosacco, Heaney and Casper"
  }, {
    "id": 7,
    "name": "Hayes",
    "image": "Gibbs",
    "status": false,
    "created_at": "9/21/2022",
    "updated_at": "7/1/2022",
    "category_id": "641428fb-0bcb-4059-926e-409c9f7ef246",
    "is_video": "Beahan LLC"
  }, {
    "id": 8,
    "name": "Mal",
    "image": "Ivashkov",
    "status": false,
    "created_at": "12/22/2021",
    "updated_at": "8/20/2022",
    "category_id": "3731c4c0-eb3a-4dd9-b052-a90d5ea3dd7c",
    "is_video": "Rippin Inc"
  }, {
    "id": 9,
    "name": "Ailene",
    "image": "Tirrey",
    "status": true,
    "created_at": "10/28/2022",
    "updated_at": "12/17/2021",
    "category_id": "1698945c-54bd-4729-9c12-3a4a85ca9e39",
    "is_video": "Gottlieb and Sons"
  }, {
    "id": 10,
    "name": "Kerry",
    "image": "Le Marquis",
    "status": true,
    "created_at": "9/14/2022",
    "updated_at": "2/22/2022",
    "category_id": "6c92ee87-2a5e-44c5-8961-0018718a1c80",
    "is_video": "Kuhlman-Legros"
  }, {
    "id": 11,
    "name": "Kathryn",
    "image": "Nail",
    "status": true,
    "created_at": "1/25/2022",
    "updated_at": "10/29/2022",
    "category_id": "d0dbf596-7c6c-4eef-9652-c46f2ba90fea",
    "is_video": "Funk-Ullrich"
  }, {
    "id": 12,
    "name": "Pearl",
    "image": "Tathacott",
    "status": false,
    "created_at": "3/25/2022",
    "updated_at": "2/5/2022",
    "category_id": "1fcf3c06-ddf4-4d58-b4d0-87e8ae315242",
    "is_video": "Daniel LLC"
  }, {
    "id": 13,
    "name": "Lucretia",
    "image": "O'Reilly",
    "status": false,
    "created_at": "11/22/2022",
    "updated_at": "6/14/2022",
    "category_id": "908def96-8399-4136-a7fd-ac6d546ade67",
    "is_video": "Kozey-Kihn"
  }, {
    "id": 14,
    "name": "Venita",
    "image": "Lillistone",
    "status": true,
    "created_at": "6/13/2022",
    "updated_at": "10/31/2022",
    "category_id": "23add2a5-9e68-4176-8a9d-5aaec6aff04f",
    "is_video": "Heidenreich-Carter"
  }, {
    "id": 15,
    "name": "Durante",
    "image": "Cale",
    "status": true,
    "created_at": "11/29/2022",
    "updated_at": "6/17/2022",
    "category_id": "feceb9cd-e05b-4d21-8f2c-7403ffc6556c",
    "is_video": "McDermott-Kunze"
  }, {
    "id": 16,
    "name": "Andee",
    "image": "Juorio",
    "status": true,
    "created_at": "10/31/2022",
    "updated_at": "4/13/2022",
    "category_id": "83a8cb9c-0192-43fe-a5f1-aa99182fb5c8",
    "is_video": "Romaguera Inc"
  }, {
    "id": 17,
    "name": "Dall",
    "image": "Shayler",
    "status": false,
    "created_at": "8/3/2022",
    "updated_at": "12/18/2021",
    "category_id": "408b55c8-9b33-4fdc-b469-14a7445a502a",
    "is_video": "Wolff-Monahan"
  }, {
    "id": 18,
    "name": "Alexina",
    "image": "Sibley",
    "status": true,
    "created_at": "4/10/2022",
    "updated_at": "8/11/2022",
    "category_id": "ab84b380-8e16-47ba-a3a8-ba7f4bb0603d",
    "is_video": "Jacobi-Barton"
  }, {
    "id": 19,
    "name": "Palm",
    "image": "Aupol",
    "status": false,
    "created_at": "3/5/2022",
    "updated_at": "10/20/2022",
    "category_id": "d3518faa-719f-46eb-8167-ad1dc0519fd9",
    "is_video": "Homenick, Schoen and Gaylord"
  }, {
    "id": 20,
    "name": "Doyle",
    "image": "Brabham",
    "status": true,
    "created_at": "4/9/2022",
    "updated_at": "8/24/2022",
    "category_id": "75eec67d-b0f4-4fa2-827a-abc1bd3eab4d",
    "is_video": "Zieme-Hahn"
  }]
const Category = ({ profileData=dummydata, tableClass,updateScheduleList, toggleTab, updatePartnerCampaginList,updateScheduler, permissions, isLoading }) => {

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
                 <h1 class="Profiles-title">Sub Category Details</h1>
                 </div>
                 <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                 <button type="button" class="secondary-btn btn btn-secondary" onClick={eventToggle}>Create Sub Category</button>
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
                      Header: "Name",
                      accessor: "name",
                      filter: "fuzzyText"
                  },
                  {
                      Header: "Image",
                      accessor: "image",
                      filter: "fuzzyText"
                     
                  },
                  {
                    Header: "Status",
                    accessor: "status",
                    filter: "fuzzyText"
                   
                },
                {
                  Header: "Is Video",
                  accessor: "is_video",
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
                                          <SubCategoryView data={isOpenDetail.data} closeDetails={() => setIsOpenDetail({...isOpenDetail, isOpen: false})}/>
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

          {eventModal && <SubCategoryAdd data={editModal} showModalEvent={eventModal} toggleEvent={eventToggle}/>}
          {eventDeleteModal && <DeleteConfirmModal showModalEvent={eventDeleteToggle} toggleEvent={eventDeleteToggle}/>}

      </div>
  )
}

export default Category