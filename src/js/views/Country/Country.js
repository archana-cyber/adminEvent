
import React, { useState, Fragment, useEffect, memo } from "react"
import { Row, Col, Table, Card, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap"
import { createUltimatePagination } from "react-ultimate-pagination";
import { Collapse } from 'reactstrap';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import {matchSorter} from 'match-sorter';
import moment from 'moment'
import "../../../styles/tableData.css"
import CreateEventModal from "../../components/CreateEventModal";
import CountryAdd from "./CountryAdd";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import ShowDetailsModal from "../../components/ShowDetailsModal";
// import CategoryView from "./CategoryView";
import { GetCountryAction,DeleteCountryAction } from "../../actions/countryAction";
import { connect } from 'react-redux'
import imageholder from "../../../images/imageholder.png"


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
    "name": "Peter",
    "image": "Delgaty",
    "status": "true",
    "is_subcategory": true,
    "created_at": "5/22/2022",
    "updated_at": "8/8/2022"
  }, {
    "id": 2,
    "name": "Cchaddie",
    "image": "Corser",
    "status": true,
    "is_subcategory": false,
    "created_at": "6/4/2022",
    "updated_at": "6/7/2022"
  }, {
    "id": 3,
    "name": "Hortense",
    "image": "Broadnicke",
    "status": false,
    "is_subcategory": false,
    "created_at": "3/17/2022",
    "updated_at": "6/20/2022"
  }, {
    "id": 4,
    "name": "Bamby",
    "image": "Ewols",
    "status": false,
    "is_subcategory": true,
    "created_at": "2/23/2022",
    "updated_at": "9/4/2022"
  }, {
    "id": 5,
    "name": "Em",
    "image": "Scouse",
    "status": true,
    "is_subcategory": true,
    "created_at": "4/10/2022",
    "updated_at": "2/23/2022"
  }, {
    "id": 6,
    "name": "Jena",
    "image": "Danilchev",
    "status": true,
    "is_subcategory": false,
    "created_at": "12/16/2021",
    "updated_at": "11/9/2022"
  }, {
    "id": 7,
    "name": "Nealy",
    "image": "Garretson",
    "status": true,
    "is_subcategory": true,
    "created_at": "5/22/2022",
    "updated_at": "1/27/2022"
  }, {
    "id": 8,
    "name": "Riva",
    "image": "Denkin",
    "status": false,
    "is_subcategory": false,
    "created_at": "5/14/2022",
    "updated_at": "8/13/2022"
  }, {
    "id": 9,
    "name": "Marley",
    "image": "Gatchell",
    "status": false,
    "is_subcategory": false,
    "created_at": "10/6/2022",
    "updated_at": "8/16/2022"
  }, {
    "id": 10,
    "name": "Kathi",
    "image": "Blaxall",
    "status": false,
    "is_subcategory": false,
    "created_at": "9/6/2022",
    "updated_at": "3/13/2022"
  }, {
    "id": 11,
    "name": "Roxie",
    "image": "Sandeland",
    "status": true,
    "is_subcategory": false,
    "created_at": "5/9/2022",
    "updated_at": "1/21/2022"
  }, {
    "id": 12,
    "name": "Ingrid",
    "image": "Ellingworth",
    "status": false,
    "is_subcategory": false,
    "created_at": "9/15/2022",
    "updated_at": "9/3/2022"
  }, {
    "id": 13,
    "name": "Nikola",
    "image": "Braben",
    "status": true,
    "is_subcategory": true,
    "created_at": "5/25/2022",
    "updated_at": "11/3/2022"
  }, {
    "id": 14,
    "name": "Kaylil",
    "image": "Wainscoat",
    "status": false,
    "is_subcategory": true,
    "created_at": "12/18/2021",
    "updated_at": "2/27/2022"
  }, {
    "id": 15,
    "name": "Geri",
    "image": "Pilmore",
    "status": true,
    "is_subcategory": false,
    "created_at": "7/25/2022",
    "updated_at": "11/14/2022"
  }, {
    "id": 16,
    "name": "Brennan",
    "image": "Savill",
    "status": false,
    "is_subcategory": true,
    "created_at": "7/18/2022",
    "updated_at": "4/29/2022"
  }, {
    "id": 17,
    "name": "Teresina",
    "image": "Bannerman",
    "status": false,
    "is_subcategory": true,
    "created_at": "10/31/2022",
    "updated_at": "7/18/2022"
  }, {
    "id": 18,
    "name": "Aile",
    "image": "Burrells",
    "status": false,
    "is_subcategory": false,
    "created_at": "9/17/2022",
    "updated_at": "2/9/2022"
  }, {
    "id": 19,
    "name": "Darbee",
    "image": "Trowell",
    "status": true,
    "is_subcategory": false,
    "created_at": "10/11/2022",
    "updated_at": "3/26/2022"
  }, {
    "id": 20,
    "name": "Libbie",
    "image": "Kieff",
    "status": true,
    "is_subcategory": false,
    "created_at": "7/1/2022",
    "updated_at": "11/10/2022"
  }]
const Country = (props) => {

   const  { countryList=[], tableClass,updateScheduleList, toggleTab, updatePartnerCampaginList,updateScheduler, permissions, isLoading }= props
   const profileData=countryList 
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
  const [deleteValue, setDeleteValue] = useState('')
  const [getDeleteId, setGetDeleteId] = useState('')
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

   console.log('CountryList000', props.CountryList)
  useEffect(()=>{
    // props.AddCountry()
    if(!props?.countryList?.length)
    props.GetCountryAction()
  },[])

  useEffect(()=>{
    
    if(deleteValue=='yes'){
        props.DeleteCountryAction(getDeleteId,(res)=>{
            if(res.status==500){
                // setErrorMsg(res.message)
             }else{
                eventDeleteToggle()
             }
        })
    }
    if(deleteValue=='no'){
        eventDeleteToggle()
    }
  },[deleteValue])

  const editModalHandler=(e,rowData)=>{
    console.log('rowData', rowData,rowData.status)
    e.preventDefault()
    e.stopPropagation();
    setEditModal(rowData)
    setEventModal(!eventModal)
  }
  const deleteModalHandler=(e,rowData)=>{
    e.preventDefault()
    e.stopPropagation()
    eventDeleteToggle()
    setGetDeleteId(rowData.value)
  }
  const eventToggle=()=>{
    setEventModal(!eventModal)
  }
  const createCategoryHandler=()=>{
    eventToggle();
    setEditModal({})
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
                  return rows?.filter(row => {
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
              data  ,
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
                             <tr>
                                <td colSpan={headerGroups[1].headers.length} style={{textAlign:"center"}}>No data found </td>
                             </tr>
                             
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
//   let scheduleList=[...profileData]
//   let scheduleLists=[];
//   scheduleList.map((e)=>{
//   scheduleLists.push({...e,['scheduledAt']:moment(e.scheduledAt).format('MMMM Do YYYY, h:mm:ss a')})})
//    console.log('scheduleData@@@' ,scheduleLists)
//   const currentProfileList = scheduleLists;
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
                    accessor: "label",
                    filter: "fuzzyText"
                },
            
              {
                Header:"Action",
                accessor: (originalRow) => (<div className="action-wrp">
                  <div className='trash-btn'><i className="fa fa-edit" onClick={(e)=>editModalHandler(e,originalRow)}></i></div>
                  <div onClick={(e) => {
                    deleteModalHandler(e,originalRow)
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
         
          
          {(props.loader) ? <div className="loader-style" style={{ position: 'relative' }}> loading... </div> :
             
            <>
                  
                  <div className="row">

                    <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                    <h1 class="Profiles-title">Country Details</h1>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <button type="button" class="secondary-btn btn btn-secondary" onClick={createCategoryHandler}>Create Country</button>
                    </div>
                    </div>
                        <Row>  
                        <Col>
                            {(profileData.length) ?
                                <OptimizedComponent
                                    columns={columns}
                                    data={profileData}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    filterVal={filterVal}
                                    setFilterVal={setFilterVal} />
                              : <Card className="empty-box">
                                  <h5>No results found</h5>
                              </Card>
                                   } 

                        </Col>
                    </Row>
              </>
          }
         
          <Row>
              <Col>
                  <Table>
                     { console.log('isOpenDetail@@',isOpenDetail )}
                      {isOpenDetail.isOpen && isOpenDetail?.data  ?
                          <tbody>
                              <tr className="detail-box">
                                  <td colSpan="6" className="details-div">
                                      <Collapse isOpen={isOpenDetail.isOpen}>
                                          <Fragment>
                                          {/* <CategoryView data={isOpenDetail?.data} closeDetails={() => setIsOpenDetail({...isOpenDetail, isOpen: false})}/> */}
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

          {eventModal && <CountryAdd data={editModal} showModalEvent={eventModal} toggleEvent={eventToggle}/>}
          {eventDeleteModal && <DeleteConfirmModal showModalEvent={eventDeleteToggle} toggleEvent={eventDeleteToggle} setDeleteValue={(value)=>setDeleteValue(value)}/>}

      </div>
  )
}

// export default Category

const mapStateToProps = state =>{
   
    const {countryList}  = state.countryReducer;
    return {countryList};
  }
  export default connect(mapStateToProps,{GetCountryAction,DeleteCountryAction})(Country);
  