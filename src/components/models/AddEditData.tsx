import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addEntry, updateEntry } from "../store/formSlice";
import { v4 as uuidv4 } from "uuid";
import { FormData } from "@/types/form";
import { toast } from "react-toastify";
interface AddEditProps {
  initialValues?: FormData;
  setOpenModel: (value: boolean) => void;
  openModel: boolean;
  modelName: string;
}
const AddEditData: React.FC<AddEditProps> = ({
  initialValues,
  openModel,
  setOpenModel,
  modelName,
}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    taxYear: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    assessor: Yup.string().required("Required"),
    accountNumber: Yup.string().required("Required"),
    appealBy: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: initialValues || {
      id: "",
      taxYear: new Date().getFullYear(),
      company: "",
      state: "",
      assessor: "",
      accountNumber: "",
      appealDate: new Date().toISOString(),
      appealBy: "",
      appealDeadline: new Date().toISOString(),
      status: "Not Sent",
    },

    validationSchema,
    onSubmit: (values) => {
      const formData = {
        ...values,
        id: modelName === "editDataModel" ? values.id : uuidv4(),
      };
      modelName === "editDataModel"
        ? dispatch(updateEntry(formData))
        : dispatch(addEntry(formData));
      setOpenModel(!openModel);
      toast.success('Success')
    },
  });
  return (
    <Modal show={openModel} onHide={() => setOpenModel(!openModel)}>
      <Modal.Header closeButton>
        <Modal.Title className="title">{modelName==='addDataModel'?'Add':'Update'} Appeal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Enter Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Year"
              className="appealForm"
              {...formik.getFieldProps("taxYear")}
            />
            {formik.touched.taxYear && formik.errors.taxYear && (
              <p className="text-danger">{formik.errors.taxYear}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Enter Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Name"
              className="appealForm"
             {...formik.getFieldProps("company")}
            />
            {formik.touched.company && formik.errors.company && (
              <p className="text-danger">{formik.errors.company}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="state">
            <Form.Label>Enter State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              className="appealForm"
               {...formik.getFieldProps("state")}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-danger">{formik.errors.state}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="assessor">
            <Form.Label>Enter Assessor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Assessor"
              className="appealForm"
             {...formik.getFieldProps("assessor")}
            />
            {formik.touched.assessor && formik.errors.assessor && (
              <p className="text-danger">{formik.errors.assessor}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="accountNumber">
            <Form.Label>Enter Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Account Number"
              className="appealForm"
               {...formik.getFieldProps("accountNumber")}
            />
             {formik.touched.accountNumber && formik.errors.accountNumber && (
              <p className="text-danger">{formik.errors.accountNumber}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="accountNumber">
            <Form.Label>Enter Appealed Deadline</Form.Label>
            <div>
              <DatePicker
                selected={
                  formik.values.appealDeadline
                    ? new Date(formik.values.appealDeadline)
                    : new Date()
                }
                onChange={(date: Date | null) =>
                  formik.setFieldValue(
                    "appealDeadline",
                    date?.toISOString() ?? ""
                  )
                }
                className="w-100"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="accountNumber">
            <Form.Label>Enter Appealed Date</Form.Label>
            <div>
              <DatePicker
                selected={
                  formik.values.appealDate
                    ? new Date(formik.values.appealDate)
                    : new Date()
                }
                onChange={(date: Date | null) =>
                  formik.setFieldValue("appealDate", date?.toISOString() ?? "")
                }
                className="w-100"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="appealBy">
            <Form.Label>Enter Appeale By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Appeale By"
              className="appealForm"
              {...formik.getFieldProps("appealBy")}
            />
              {formik.touched.appealBy && formik.errors.appealBy && (
              <p className="text-danger">{formik.errors.appealBy}</p>
            )}
          </Form.Group>
          <div className="d-flex flex-row justify-content-around ">
            <Button type="submit" className="modelBtn border-0">
             {modelName==='addDataModel'?'Add':'Update'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddEditData;
