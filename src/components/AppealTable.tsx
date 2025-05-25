import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Pagination from "./Pagination";
import DotVertical from "./icons/DotVertical";
import Search from "./icons/Search";
import Filter from "./icons/Filter";
import DotHorizontal from "./icons/DotHorizontal";
import FilterTable from "./icons/FilterTable";
import Arrow from "./icons/Arrow";
import { Badge } from "react-bootstrap";
import AddEditData from "./models/AddEditData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import ConfirmationModel from "./models/ConfirmationModel";
import { deleteEntry } from "./store/formSlice";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdAddToPhotos } from "react-icons/md";
import CustomCalendar from "./CustomCalender";
import { toast } from "react-toastify";
const AppealTable = () => {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openCustomCalender, setOpenCustomCalender] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>("");
  const entries = useSelector((state: RootState) => state.form.entries);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [entryToDelete, setEntryToDelete] = useState<any>(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentEntries = entries.slice(offset, offset + itemsPerPage);
  const totalItems = entries.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="d-inline-block text-center mt-3">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-medium text-dark">Appeal Letter</span>
          <Badge pill bg="danger" className="px-2 py-1 countBg">
            {entries.length}
          </Badge>
        </div>
        <div className="underline-bar mt-2"></div>
      </div>
      <div className="container-fluid bg-white rounded-4 pb-3">
        <div className="d-flex justify-content-end align-items-center mb-3 ">
          <div className="d-flex flex-lg-row flex-column column-gap-2 py-3  gap-3">
            <Form className="d-flex align-items-center mb-lg-0">
              <div className="position-relative formContainer">
                <FormControl
                  type="text"
                  placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
                />{" "}
                <Search />
              </div>
            </Form>
            <div className="d-flex flex-row column-gap-2">
              <div className="event-container">
                {" "}
                <button onClick={() => {setOpenCustomCalender(!openCustomCalender)}} title='Add Event' className="border-0 bg-transparent p-0"><FilterTable /></button>
                <div className={`event-content ${openCustomCalender && !openModel ? "show" : ""}`}>
                  <CustomCalendar />
                </div>
              </div>
              <div className="hover-container">
                <DotHorizontal />
                <div className="dropdown-content gap-4">
                  <MdAddToPhotos
                    className="display-6 ms-1"
                    onClick={() => {
                      setEditingEntry(null);
                      setModelName("addDataModel");
                      setOpenModel(!openModel);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Table hover responsive>
          <thead className="custom-thead">
            <tr>
              <th className="py-3">
                <Form.Check />
              </th>
              <th className="text-nowrap py-3 ">
                <div className="d-flex flex-row column-gap-1">
                  TAX YEAR <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3 d-flex flex-row column-gap-1">
                <div className="d-flex flex-row column-gap-1">
                  COMPANY <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3 ">
                <div className="d-flex flex-row column-gap-1">
                  STATE <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3">
                <div className="d-flex flex-row column-gap-1">
                  ASSESSOR <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3">
                <div className="d-flex flex-row column-gap-1">
                  ACCOUNT NUMBER <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3 ">
                <div className="d-flex flex-row column-gap-1">
                  APPEALEE DEADLINE <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3">
                <div className="d-flex flex-row column-gap-1">
                  STATUS <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3">
                <div className="d-flex flex-row column-gap-1">
                  APPEALEE DATE <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="text-nowrap py-3 ">
                <div className="d-flex flex-row column-gap-1">
                  APPEALEE BY <Arrow />
                  <Filter />
                </div>
              </th>
              <th className="py-3 ">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="py-2">
                  <Form.Check />
                </td>
                <td className="py-2">{entry.taxYear}</td>
                <td className="py-2">{entry.company}</td>
                <td className="py-2">{entry.state}</td>
                <td className="py-2">{entry.assessor}</td>
                <td className="py-2">{entry.accountNumber}</td>
                <td className="py-2">
                  {new Date(entry.appealDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td
                  className={`py-2 ${
                    entry.status === "Not Sent" && "text-danger"
                  }`}
                >
                  {entry.status}
                </td>
                <td className="py-2">
                  {new Date(entry.appealDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2">{entry.appealBy}</td>
                <td className="py-2">
                  <div className="hover-container">
                    <DotVertical />
                    <div className="dropdown-content gap-4">
                      <FiEdit
                        className="fs-5 me-1 "
                        onClick={() => {
                          setEditingEntry(entry);
                          setModelName("editDataModel");
                          setOpenModel(!openModel);
                        }}
                      />
                      <AiFillDelete
                        className="fs-5 ms-1"
                        onClick={() => {
                          setEntryToDelete(entry);
                          setModelName("delete");
                          setOpenModel(!openModel);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
      {openModel && modelName === "addDataModel" && (
        <AddEditData
          setOpenModel={setOpenModel}
          openModel={openModel}
          modelName={modelName}
        />
      )}
      {openModel && modelName === "editDataModel" && editingEntry && (
        <AddEditData
          setOpenModel={setOpenModel}
          openModel={openModel}
          modelName={modelName}
          initialValues={editingEntry}
        />
      )}
      {modelName === "delete" && entryToDelete && (
        <ConfirmationModel
          setOpenModel={setOpenModel}
          openModel={openModel}
          onConfirm={() => {
            dispatch(deleteEntry(entryToDelete.id));
            setEntryToDelete(null);
            toast.success('Deleted')
          }}
        />
      )}
    </>
  );
};

export default AppealTable;
