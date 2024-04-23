import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeToMyList } from '../Actions/accountActions';

const RemoveToListButton = ({ productId, userId }) => {
  const dispatch = useDispatch();

  const removeToMyListHandler = () => {
    dispatch(removeToMyList(userId, productId));
  };

  return (
    <div style={{ width: "12rem" }}>
      <Button onClick={removeToMyListHandler} variant="danger">Remove to My List</Button>
    </div>
  );
};

export default RemoveToListButton;
