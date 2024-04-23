import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addToMyList } from '../Actions/accountActions';

const AddToListButton = ({ productId, userId }) => {
  let dispatch = useDispatch();

  const addToMyList1 = () => {
    dispatch(addToMyList(userId, productId));
  };

  return (
    <div style={{ width: "8.5rem" }}>
    <Button onClick={addToMyList1} style={{ padding: '4.5px' }}>Add to My List</Button>
    </div>
  );
};

export default AddToListButton;
