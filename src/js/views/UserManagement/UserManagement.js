
import React, { useState, Fragment, useEffect, memo } from "react"
import { Row, Col, Table, Card, Pagination, PaginationItem, PaginationLink,Input,FormGroup, Button,Spinner } from "reactstrap"
import { createUltimatePagination } from "react-ultimate-pagination";
import { Collapse } from 'reactstrap';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import {matchSorter} from 'match-sorter';
import moment from 'moment'
import "../../../styles/tableData.css"
import CreateEventModal from "../../components/CreateEventModal";
import UserManagementAdd from "./UserManagementAdd";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import ShowDetailsModal from "../../components/ShowDetailsModal";
import UserManagementView from "./UserManagementView";
import { GetUsersAction,ChangeUserStatusAction } from "../../actions/authAction";
import { connect } from 'react-redux'
import imageholder from "../../../images/imageholder.png"
import { CSVLink } from "react-csv";

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
    "name": "Alfreda",
    "profile_image": "Gedling",
    "email": "agedling0@scribd.com",
    "password": "5Imb3OlTAMX",
    "google_uid": "04b41741-606f-4d95-8548-bd8f871eee40",
    "facebook_uid": "637190b3-a8a0-493e-8dbd-ec0f58ff4d4c",
    "apple_uid": "5f9ee962-20ac-49e6-bfde-a9cf29067a5a",
    "city": "Huxiaoqiao",
    "country": "China",
    "status": false,
    "email_verified": "3/1/2022",
    "created_at": "8/11/2022",
    "updated_at": "6/18/2022",
    "gender": "Female",
    "social_media": "Red"
  }, {
    "id": 2,
    "name": "Trip",
    "profile_image": "Handasyde",
    "email": "thandasyde1@taobao.com",
    "password": "SYZ8xxIv",
    "google_uid": "35df219d-f737-410d-b036-b22fd1dca685",
    "facebook_uid": "31cf42c6-a149-4505-93a9-6ecefa3b454f",
    "apple_uid": "2ebb9db6-2321-4732-8af6-10b37cd90cc8",
    "city": "Gornyak",
    "country": "Russia",
    "status": false,
    "email_verified": "10/24/2022",
    "created_at": "4/19/2022",
    "updated_at": "11/18/2022",
    "gender": "Male",
    "social_media": "Fuscia"
  }, {
    "id": 3,
    "name": "Perceval",
    "profile_image": "Smowton",
    "email": "psmowton2@nba.com",
    "password": "snFKPJmw3ok",
    "google_uid": "465cb50c-ef39-4aad-b2a5-d07ca388a839",
    "facebook_uid": "d74fdb60-4e2f-4616-9cf4-24d4ba58b170",
    "apple_uid": "12f0a098-156a-4760-b44f-2f8536f77a78",
    "city": "Ilanskiy",
    "country": "Russia",
    "status": false,
    "email_verified": "8/29/2022",
    "created_at": "3/17/2022",
    "updated_at": "5/26/2022",
    "gender": "Male",
    "social_media": "Pink"
  }, {
    "id": 4,
    "name": "Frank",
    "profile_image": "Steele",
    "email": "fsteele3@google.co.uk",
    "password": "cfpSJJtQ1M",
    "google_uid": "bf4f4d38-35b9-41c6-9dfd-6f578560d6d6",
    "facebook_uid": "9bc2cbb0-4b75-4270-9569-fd68cc034566",
    "apple_uid": "be1c90d4-eacc-4aa2-b004-d9a8ef2fe1bd",
    "city": "Saparua",
    "country": "Indonesia",
    "status": true,
    "email_verified": "7/28/2022",
    "created_at": "7/6/2022",
    "updated_at": "10/19/2022",
    "gender": "Female",
    "social_media": "Turquoise"
  }, {
    "id": 5,
    "name": "Siouxie",
    "profile_image": "Peterffy",
    "email": "speterffy4@instagram.com",
    "password": "sv2qT31",
    "google_uid": "76eb3436-dc62-44cd-9248-394d0f2b0422",
    "facebook_uid": "c01b394f-ff02-423c-a553-98ea6939b04d",
    "apple_uid": "19ef245d-962e-4854-87ce-763daf342bc4",
    "city": "Gunungkendeng",
    "country": "Indonesia",
    "status": false,
    "email_verified": "2/14/2022",
    "created_at": "3/11/2022",
    "updated_at": "12/1/2021",
    "gender": "Female",
    "social_media": "Khaki"
  }, {
    "id": 6,
    "name": "Cory",
    "profile_image": "Rignoldes",
    "email": "crignoldes5@ifeng.com",
    "password": "4T05LNOEQtz",
    "google_uid": "30ce5db1-9458-4d5c-a434-1ae7ae12c64b",
    "facebook_uid": "222e360e-9b05-4c3e-a062-1d431748b4ec",
    "apple_uid": "4110a6fd-7650-4dd7-8d29-b0791cfb3973",
    "city": "Gagarin",
    "country": "Armenia",
    "status": false,
    "email_verified": "7/2/2022",
    "created_at": "5/5/2022",
    "updated_at": "9/3/2022",
    "gender": "Female",
    "social_media": "Aquamarine"
  }, {
    "id": 7,
    "name": "Falkner",
    "profile_image": "Bullock",
    "email": "fbullock6@desdev.cn",
    "password": "ZutRO6C",
    "google_uid": "07a57d8c-1d04-4f88-b3e6-5107d946ae15",
    "facebook_uid": "1e1c05a8-e12e-4f08-973c-b871d75700ee",
    "apple_uid": "0749873a-c2b6-407d-b6b6-119e2b47d418",
    "city": "Bieligutai",
    "country": "China",
    "status": false,
    "email_verified": "2/4/2022",
    "created_at": "4/22/2022",
    "updated_at": "4/27/2022",
    "gender": "Male",
    "social_media": "Yellow"
  }, {
    "id": 8,
    "name": "Yolanda",
    "profile_image": "Corn",
    "email": "ycorn7@businessweek.com",
    "password": "7ssJCj5",
    "google_uid": "aeb60816-fbff-410a-b946-9a84492b0698",
    "facebook_uid": "fba4619c-8554-4f9b-a3a4-6793bfd1673f",
    "apple_uid": "210e9435-08ca-441d-8a8a-79b8bc1997f6",
    "city": "Jungutbatu Kaja Dua",
    "country": "Indonesia",
    "status": true,
    "email_verified": "9/5/2022",
    "created_at": "8/16/2022",
    "updated_at": "8/8/2022",
    "gender": "Female",
    "social_media": "Maroon"
  }, {
    "id": 9,
    "name": "Thedrick",
    "profile_image": "Warcup",
    "email": "twarcup8@amazon.com",
    "password": "2OHc3ZZ",
    "google_uid": "b5c6cdcb-4dfd-49c3-b440-1693716555a2",
    "facebook_uid": "0d73c995-130c-469a-a58b-6bcb190f2dd8",
    "apple_uid": "9aecd9ed-654f-46e3-9339-7269d58eb873",
    "city": "Puteaux",
    "country": "France",
    "status": true,
    "email_verified": "6/6/2022",
    "created_at": "6/4/2022",
    "updated_at": "6/26/2022",
    "gender": "Male",
    "social_media": "Violet"
  }, {
    "id": 10,
    "name": "Leann",
    "profile_image": "Faughnan",
    "email": "lfaughnan9@psu.edu",
    "password": "JlLNHw5gC2",
    "google_uid": "fac4c106-0550-4b0e-a519-39c24c23a5de",
    "facebook_uid": "2282d9c8-ea5a-4ec7-83b1-499f0a655af9",
    "apple_uid": "889e9c7c-1990-43bf-b050-01f1c7854d84",
    "city": "Stockholm",
    "country": "Sweden",
    "status": false,
    "email_verified": "2/23/2022",
    "created_at": "5/9/2022",
    "updated_at": "5/6/2022",
    "gender": "Female",
    "social_media": "Indigo"
  }, {
    "id": 11,
    "name": "Wilden",
    "profile_image": "Tschirschky",
    "email": "wtschirschkya@oaic.gov.au",
    "password": "vx1WRQYHq1b",
    "google_uid": "5d9944cd-102c-44e2-a775-fe4fc15533e7",
    "facebook_uid": "fcefc766-0262-4ce9-8037-67b450401165",
    "apple_uid": "336b83e8-81bb-42b2-99df-10b8fb7ddeff",
    "city": "Wahawaha",
    "country": "Indonesia",
    "status": false,
    "email_verified": "6/23/2022",
    "created_at": "3/24/2022",
    "updated_at": "10/23/2022",
    "gender": "Male",
    "social_media": "Purple"
  }, {
    "id": 12,
    "name": "Maurizio",
    "profile_image": "Chalke",
    "email": "mchalkeb@example.com",
    "password": "6Nfv9jvHdlMU",
    "google_uid": "6e777218-f896-4f90-b58b-cbb46059b31f",
    "facebook_uid": "760a6560-d147-409c-aa6d-a158e1edd18c",
    "apple_uid": "ff9c16e9-2004-4cb9-b504-80acdc68b51c",
    "city": "Caldas da Felgueira",
    "country": "Portugal",
    "status": true,
    "email_verified": "12/25/2021",
    "created_at": "3/29/2022",
    "updated_at": "4/25/2022",
    "gender": "Male",
    "social_media": "Green"
  }, {
    "id": 13,
    "name": "Niko",
    "profile_image": "Ewens",
    "email": "newensc@meetup.com",
    "password": "qw3HFS",
    "google_uid": "a4e4563e-7446-4b90-993b-7f1ad9034217",
    "facebook_uid": "5d477bbf-c4f4-4288-af99-b229a070c567",
    "apple_uid": "2d58f525-0a21-4be0-8ff1-f23cfbd14729",
    "city": "Songshi",
    "country": "China",
    "status": true,
    "email_verified": "6/16/2022",
    "created_at": "5/12/2022",
    "updated_at": "10/23/2022",
    "gender": "Male",
    "social_media": "Goldenrod"
  }, {
    "id": 14,
    "name": "Graeme",
    "profile_image": "Drewett",
    "email": "gdrewettd@senate.gov",
    "password": "eQfkZe",
    "google_uid": "311d9da4-9e65-46a3-ae31-49eaf84bc4df",
    "facebook_uid": "81132698-4c06-424a-9518-5ec8cb2e44fd",
    "apple_uid": "36cd600d-a423-4101-aaf7-7c3eb03b1431",
    "city": "Ouangani",
    "country": "Mayotte",
    "status": false,
    "email_verified": "3/3/2022",
    "created_at": "3/14/2022",
    "updated_at": "10/18/2022",
    "gender": "Male",
    "social_media": "Purple"
  }, {
    "id": 15,
    "name": "Ottilie",
    "profile_image": "Rankmore",
    "email": "orankmoree@yolasite.com",
    "password": "IAUDu8estvo",
    "google_uid": "1e156b72-59e4-49eb-86d4-c302f3f7a38a",
    "facebook_uid": "cd6da00d-2505-44ba-b60d-40e8b053bc9f",
    "apple_uid": "1a17dccb-804b-4d03-951d-8e9cfe898bb2",
    "city": "Uwajima",
    "country": "Japan",
    "status": false,
    "email_verified": "8/15/2022",
    "created_at": "6/5/2022",
    "updated_at": "10/22/2022",
    "gender": "Female",
    "social_media": "Violet"
  }, {
    "id": 16,
    "name": "Selie",
    "profile_image": "Stote",
    "email": "sstotef@mayoclinic.com",
    "password": "YHdRvR87XTLj",
    "google_uid": "0f66eae7-8e38-471d-af4f-9f119364ed54",
    "facebook_uid": "1abc260c-0b97-4b5f-9031-8be3381180f1",
    "apple_uid": "eb5dd4fc-f891-4209-bdd5-37ae839c1b5a",
    "city": "Tours",
    "country": "France",
    "status": false,
    "email_verified": "4/30/2022",
    "created_at": "9/20/2022",
    "updated_at": "12/26/2021",
    "gender": "Female",
    "social_media": "Crimson"
  }, {
    "id": 17,
    "name": "Astrid",
    "profile_image": "Munroe",
    "email": "amunroeg@dmoz.org",
    "password": "9eon0dfbCZfR",
    "google_uid": "cb055ded-95c2-4b27-9c46-79fc6f620e11",
    "facebook_uid": "a9c6290a-d5e2-493a-9458-175eb96352b1",
    "apple_uid": "86a2678c-7d0c-4118-943d-b833a0aeec7a",
    "city": "Kirovs’k",
    "country": "Ukraine",
    "status": false,
    "email_verified": "7/26/2022",
    "created_at": "1/13/2022",
    "updated_at": "5/4/2022",
    "gender": "Female",
    "social_media": "Turquoise"
  }, {
    "id": 18,
    "name": "Mac",
    "profile_image": "Kitt",
    "email": "mkitth@columbia.edu",
    "password": "BV1Mlvqv",
    "google_uid": "1591c825-2d94-4895-a291-48accfabfff5",
    "facebook_uid": "319a1d49-3dc3-439c-9245-59f482ffc2a7",
    "apple_uid": "66e952b9-727c-4737-8c45-987c01036c2e",
    "city": "Wuhu",
    "country": "China",
    "status": true,
    "email_verified": "3/15/2022",
    "created_at": "9/26/2022",
    "updated_at": "11/18/2022",
    "gender": "Male",
    "social_media": "Fuscia"
  }, {
    "id": 19,
    "name": "Ahmed",
    "profile_image": "Ziemsen",
    "email": "aziemseni@oaic.gov.au",
    "password": "qJishYJ",
    "google_uid": "c4be2d89-216b-430c-9788-9b95f8640449",
    "facebook_uid": "d350022f-806d-422a-a01b-e8cec6c55d79",
    "apple_uid": "29b71495-0686-414b-a377-2e905d7b8066",
    "city": "Mabalacat",
    "country": "Philippines",
    "status": true,
    "email_verified": "8/8/2022",
    "created_at": "11/4/2022",
    "updated_at": "4/11/2022",
    "gender": "Male",
    "social_media": "Violet"
  }, {
    "id": 20,
    "name": "Roxie",
    "profile_image": "Annakin",
    "email": "rannakinj@storify.com",
    "password": "MPtuJjM",
    "google_uid": "98cd0aeb-bf91-4309-aed1-1accd506d5c7",
    "facebook_uid": "aeea2ca2-301c-45fc-90c9-0caa56210b87",
    "apple_uid": "5ed2ab22-e18a-486e-b395-f1884c19952c",
    "city": "Sukamanah",
    "country": "Indonesia",
    "status": true,
    "email_verified": "3/8/2022",
    "created_at": "10/30/2022",
    "updated_at": "10/16/2022",
    "gender": "Female",
    "social_media": "Green"
  }, {
    "id": 21,
    "name": "Oralia",
    "profile_image": "Pinks",
    "email": "opinksk@google.com.hk",
    "password": "0f2IV7Rboize",
    "google_uid": "1e3c3e20-8034-4308-b081-01f5b9009d2a",
    "facebook_uid": "8551596c-3b47-4b00-9a40-80b6a797fbeb",
    "apple_uid": "fa01bba4-b301-42ac-8ae2-22590187db28",
    "city": "Nkhotakota",
    "country": "Malawi",
    "status": true,
    "email_verified": "1/15/2022",
    "created_at": "9/6/2022",
    "updated_at": "3/18/2022",
    "gender": "Female",
    "social_media": "Puce"
  }, {
    "id": 22,
    "name": "Moll",
    "profile_image": "Forsythe",
    "email": "mforsythel@google.co.uk",
    "password": "LhdbVmwPco",
    "google_uid": "fb0af36c-1d0d-452a-b95a-68123a5bf1d8",
    "facebook_uid": "e30d4521-aed6-4b6a-93f0-8deba985859a",
    "apple_uid": "ac9340ce-da17-452f-be47-c0f3dbf88f84",
    "city": "Mohelnice",
    "country": "Czech Republic",
    "status": true,
    "email_verified": "2/12/2022",
    "created_at": "7/2/2022",
    "updated_at": "4/14/2022",
    "gender": "Female",
    "social_media": "Goldenrod"
  }, {
    "id": 23,
    "name": "Clare",
    "profile_image": "Costellow",
    "email": "ccostellowm@t.co",
    "password": "swpYKymk",
    "google_uid": "2ab98c2e-7132-4672-a8b8-f814c7f2c0df",
    "facebook_uid": "a65ff7a3-25e1-4d61-9ac8-83d06fa7ecc6",
    "apple_uid": "49617df0-6303-4049-a494-9f664ae90cab",
    "city": "Mangochi",
    "country": "Malawi",
    "status": false,
    "email_verified": "2/8/2022",
    "created_at": "7/4/2022",
    "updated_at": "10/2/2022",
    "gender": "Male",
    "social_media": "Fuscia"
  }, {
    "id": 24,
    "name": "Obidiah",
    "profile_image": "Bushill",
    "email": "obushilln@phpbb.com",
    "password": "cibJPut",
    "google_uid": "e1fd9b3f-c5c4-4ec9-b0b3-50705a7c4ec4",
    "facebook_uid": "3308a094-e0d4-47c7-a5d7-8686b21393ae",
    "apple_uid": "88c7921e-1cd5-4c56-a34a-c2b971e05b3a",
    "city": "Pyhäranta",
    "country": "Finland",
    "status": false,
    "email_verified": "4/13/2022",
    "created_at": "5/31/2022",
    "updated_at": "10/16/2022",
    "gender": "Male",
    "social_media": "Turquoise"
  }, {
    "id": 25,
    "name": "Meggi",
    "profile_image": "Werndly",
    "email": "mwerndlyo@cdc.gov",
    "password": "F4znjkq",
    "google_uid": "ee86fe1e-4541-4274-848f-cde5a37b8d5c",
    "facebook_uid": "77b336ff-126b-4146-be5a-650d10858080",
    "apple_uid": "5b13c328-d016-4efd-808b-7d147a43dfc9",
    "city": "Sharïngol",
    "country": "Mongolia",
    "status": true,
    "email_verified": "3/28/2022",
    "created_at": "11/18/2022",
    "updated_at": "5/25/2022",
    "gender": "Female",
    "social_media": "Pink"
  }, {
    "id": 26,
    "name": "Bernarr",
    "profile_image": "Farny",
    "email": "bfarnyp@craigslist.org",
    "password": "PVhoVCqbfn",
    "google_uid": "be570655-b2eb-47ab-a805-17ae31dc9865",
    "facebook_uid": "3549cc98-d081-4b27-9a65-833f846392aa",
    "apple_uid": "cdd36d8c-15cd-44ea-9e51-2dfb2dd255a4",
    "city": "Yinkeng",
    "country": "China",
    "status": true,
    "email_verified": "4/29/2022",
    "created_at": "8/15/2022",
    "updated_at": "7/17/2022",
    "gender": "Male",
    "social_media": "Crimson"
  }, {
    "id": 27,
    "name": "Felice",
    "profile_image": "Preuvost",
    "email": "fpreuvostq@shareasale.com",
    "password": "JxJ7aJ7",
    "google_uid": "ad2e5932-ea91-4470-b565-fccaba2af88e",
    "facebook_uid": "8976ac78-0f89-4faf-b26f-c11598cb844b",
    "apple_uid": "d99b0a66-3fd3-471f-9583-09736ddec3fb",
    "city": "Sendang",
    "country": "Indonesia",
    "status": false,
    "email_verified": "9/10/2022",
    "created_at": "11/26/2022",
    "updated_at": "6/30/2022",
    "gender": "Female",
    "social_media": "Fuscia"
  }, {
    "id": 28,
    "name": "Randell",
    "profile_image": "Rosina",
    "email": "rrosinar@bigcartel.com",
    "password": "5jgG0dR4oH",
    "google_uid": "bc0e1729-204b-4b87-8bb0-b6946c68e5d7",
    "facebook_uid": "54b93df3-22de-456c-a911-a7f6c02b78f2",
    "apple_uid": "28d9fe9a-589e-4f6b-9aad-b06f3ff25cb0",
    "city": "Carregal",
    "country": "Portugal",
    "status": true,
    "email_verified": "2/19/2022",
    "created_at": "12/14/2021",
    "updated_at": "9/26/2022",
    "gender": "Male",
    "social_media": "Khaki"
  }, {
    "id": 29,
    "name": "Evey",
    "profile_image": "Knipe",
    "email": "eknipes@thetimes.co.uk",
    "password": "3FGiq2P8L4Uk",
    "google_uid": "5bb633c3-2373-43d5-909b-d711233881d6",
    "facebook_uid": "4aef1994-3b34-49f2-9278-dac2c6754cd2",
    "apple_uid": "3e58c0c0-3ef6-4583-80ff-f273e52ad16d",
    "city": "Solţānābād",
    "country": "Iran",
    "status": false,
    "email_verified": "7/14/2022",
    "created_at": "6/1/2022",
    "updated_at": "8/17/2022",
    "gender": "Female",
    "social_media": "Aquamarine"
  }, {
    "id": 30,
    "name": "Cyrillus",
    "profile_image": "Bestall",
    "email": "cbestallt@mlb.com",
    "password": "ycHdDHUzPLqg",
    "google_uid": "c0a551e2-cabc-42bf-b019-b8e6c3147535",
    "facebook_uid": "b49a65e4-fa64-43a2-865d-52c1b79af74a",
    "apple_uid": "acb319c9-666e-4f32-b13f-dce6598559b1",
    "city": "Hegarmulya",
    "country": "Indonesia",
    "status": false,
    "email_verified": "12/9/2021",
    "created_at": "2/5/2022",
    "updated_at": "9/9/2022",
    "gender": "Male",
    "social_media": "Blue"
  }]
   
const dataHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Gender", key: "gender" },
    { label: "Country", key: "country" },
    { label: "City", key: "city" },
    { label: "Google Id", key: "googleId" },
    { label: "Apple Id", key: "appleId" },
    { label: "Facebook Id", key: "facebookId" },
    { label: "Social Media", key: "socialMedia" },
    { label: "Email Verified", key: "emailVerified" },
    { label: "Profile Image", key: "profileImage" },
  ];
   
 
const UserManagement = (props) => {

  const { userList=[], tableClass,updateScheduleList, toggleTab, updatePartnerCampaginList,updateScheduler, permissions, isLoading }=props
  const profileData=userList 
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
 const [toggleValue, setToggleValue] = useState(false)
  const toggleDatePickerModal = () => setDatePickerModal(!datePickerModal);
  const csvReport = {
    data: profileData,
    headers: dataHeaders,
    filename: 'User_Report.csv'
  };
  useEffect(()=>{
    // props.AddCategory()
    if(!props.userList.length)
    props.GetUsersAction()
  },[])

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
  const toggleHandlerData=(e,data)=>{
    e.preventDefault()
    e.stopPropagation();
    // e.stopPropagation();
    props.ChangeUserStatusAction(data.id,!data.status,(data)=>{
        if(data){
            window.location.reload()
        }
    })
    console.log('toggllennnsnsn',e.target, data)
    setToggleValue(!data);
  }

  console.log('toggleValue', toggleValue)
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
                 <h1 class="Profiles-title">User Details</h1>
                 </div>
                 <div classname="App">
                    {/* <h3>Export data to CSV  <a href="https://cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3> */}
                   
                    <CSVLink {...csvReport}>
                        <button type="button" class="secondary-btn btn btn-secondary"><i className="fa fa-download"/> Export User Data</button>
                    </CSVLink>
                </div>
                 {/* <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                 <button type="button" class="secondary-btn btn btn-secondary" onClick={eventToggle}>Create User</button>
                 </div> */}
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
                    Header:"Image",
                    accessor: (originalRow) => (<div className="image-wrapper">
                        {originalRow.profileImage ? <div>
                            <img src={originalRow.profileImage}/>
                        </div> :
                        <div><img src={imageholder}/></div>}
                      </div>),
                  disableFilters: true
                  },
                  {
                      Header: "Name",
                      accessor: "name",
                      filter: "fuzzyText"
                  },
                //   {
                //     Header: "Status",
                //     accessor: (originalRow) => (<div className="action-wrp">{originalRow.status==true ? "Active" :"Deactive"}</div>),
                //    disableFilters: true
                //   },
                  {
                    Header: "Status",
                    accessor: (originalRow) => (<div className="action-wrp toggle-wrp" onClick={(e) => toggleHandlerData(e,originalRow)}>
                                              {/* <FormGroup switch> <Input type="switch" checked={toggleValue} onClick={() => toggleHandler(originalRow.status)} /></FormGroup> */}
                                              {/* <input type="checkbox" checked={toggleValue}  onClick={(e) => toggleHandlerData(e,originalRow.status)}/> */}

                        <label class="switch">
                            <input type="checkbox" checked={originalRow.status==true?true:false}  />
                            <span class="slider round"></span>
                        </label>
                     </div>),
                   disableFilters: true
                  },
                 
                  {
                    Header: "Email",
                    accessor: "email",
                    filter: "fuzzyText"
                   
                },
                {
                    Header:"Country",
                    accessor: (originalRow) => (<div className="action-wrp">{(originalRow.country && originalRow.country.name)?originalRow.country.name : 'N/A'}</div>),
                    disableFilters: true
                  },
                  
              ]
          }
      ],
      []
  );

  return (
      <div className={tableClass}>
         
          {toggleLoader ? <div className="loader-style" > loading... </div> : null}
         
          
          {props.loader ? <div className='col-12'>
        <div style={{ display:"flex",justifyContent:"center" }}><Spinner color="red" size="sm" /></div>

        </div> :
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
                                          <UserManagementView data={isOpenDetail.data} closeDetails={() => setIsOpenDetail({...isOpenDetail, isOpen: false})}/>
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

          {eventModal && <UserManagementAdd data={editModal} showModalEvent={eventModal} toggleEvent={eventToggle}/>}
          {eventDeleteModal && <DeleteConfirmModal showModalEvent={eventDeleteToggle} toggleEvent={eventDeleteToggle}/>}

      </div>
  )
}

// export default UserManagement

const mapStateToProps = state =>{
   
    const {userList,loader}  = state.authReducer;
    return {userList,loader};
  }
  export default connect(mapStateToProps,{GetUsersAction,ChangeUserStatusAction})(UserManagement);
  