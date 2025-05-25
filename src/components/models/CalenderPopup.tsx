import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/store";
import { addEntry, deleteEntry } from "../store/calendarSlice";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
interface Props {
  selectedDate: Date;
  onClose: () => void;
}
const CalendarPopup = ({ selectedDate, onClose }: Props) => {
  const dispatch = useDispatch();
  const dateStr = selectedDate.toLocaleDateString('en-CA').split("T")[0];
  const entries = useSelector((state: RootState) =>
    state.calendar.entries.filter((e) => e.date === dateStr)
  );
  const [newType, setNewType] = useState<"event" | "reminder">("event");
  const [newTitle, setNewTitle] = useState("");
  const handleAdd = () => {
    if (newTitle.trim()) {
      dispatch(
        addEntry({
          id: uuidv4(),
          date: dateStr,
          type: newType,
          title: newTitle,
        })
      );
      toast.success('Added!')
      setNewTitle("");
    }
    else{
        toast.error('Please add title first !')
    }
  };
  const handleDelete = (id: string) => {
    dispatch(deleteEntry(id));
  };
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="title">{dateStr} Entries</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  {entry.title} ({entry.type})
                </span>
                <AiFillDelete
                  className="fs-5"
                  onClick={() => handleDelete(entry.id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <Form.Group className="mb-2">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
          >
            <option value="event">Event</option>
            <option value="reminder">Reminder</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="appealForm"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex flex-row justify-content-around ">
          <Button onClick={handleAdd} className="modelBtn border-0">
            Add
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default CalendarPopup;
