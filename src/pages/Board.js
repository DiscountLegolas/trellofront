import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import Board from '../components/Board/Board';
import LandingPageAppBar from '../components/LandingPage/Auth/LandingPageAppBar';
import AuthService from '../services/authservice';
import { useParams } from 'react-router-dom';
import { getBoard } from "../redux/Slices/BoardSlice";

export default function BoardPage() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const {board,loaded } = useSelector((state) => state.board);
    React.useEffect(()=>{
      dispatch(getBoard({id:id}));
    },[])
    return(
      <div className="board-div">
         {!loaded ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <LandingPageAppBar user={AuthService.getCurrentUser()} />
          <Board initial={board} withScrollableColumns />
        </div>
      )}
      </div>
    )
  }