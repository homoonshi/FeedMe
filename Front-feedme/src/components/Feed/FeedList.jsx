import React, { useState } from 'react';
import './FeedList.css';
import { FaAngleLeft, FaAngleRight, FaEllipsisH } from 'react-icons/fa';
import '../../assets/font/Font.css' 
import photo1 from '../../assets/images/test1.png';
import photo2 from '../../assets/images/test2.png';
import photo3 from '../../assets/images/test3.png';
import '../../assets/font/Font.css' 

const initialPhotos = [
  { src: photo1, caption: '불사조', comments: [] },
  { src: photo2, caption: '산책', comments: [] },
  { src: photo3, caption: '판다', comments: [] },
];

const FeedList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState(initialPhotos);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [showOptions, setShowOptions] = useState(null);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const updatedPhotos = [...photos];
      updatedPhotos[currentIndex].comments.push(newComment);
      setPhotos(updatedPhotos);
      setNewComment('');
    }
  };

  const handleEditCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleCommentEdit = (index) => {
    setEditingComment(index);
    setEditedComment(photos[currentIndex].comments[index]);
    setShowOptions(null);
  };

  const handleCommentSave = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[currentIndex].comments[index] = editedComment;
    setPhotos(updatedPhotos);
    setEditingComment(null);
    setEditedComment('');
  };

  const handleCommentDelete = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[currentIndex].comments.splice(index, 1);
    setPhotos(updatedPhotos);
    setShowOptions(null);
  };

  const handleShowOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <div className="FeedList">
      <button className="arrowleft" onClick={handlePrevClick}>
        <FaAngleLeft />
      </button>      
      
      <div className="FeedListPhoto">
        <img src={photos[currentIndex].src} alt="feed" className="FeedListImg" />
        <p className="FeedListCaption">{photos[currentIndex].caption}</p>
      </div>

      <div className="FeedListCom">
        <form onSubmit={handleCommentSubmit} className="commentForm">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요..."
            className="commentInput"
          />
          <button type="submit" className="commentButton">등록</button>
        </form>
        <ul className="commentsList">
          {photos[currentIndex].comments.map((comment, index) => (
            <li key={index} className="commentItem">
              {editingComment === index ? (
                <input
                  type="text"
                  value={editedComment}
                  onChange={handleEditCommentChange}
                  className="editCommentInput"
                />
              ) : (
                <span>{comment}</span>
              )}
              <div className="commentActions">
                {editingComment === index ? (
                  <button onClick={() => handleCommentSave(index)} className="saveButton">저장</button>
                ) : (
                  <>
                    <FaEllipsisH onClick={() => handleShowOptions(index)} className="ellipsisButton" />
                    {showOptions === index && (
                      <div className="optionsDropdown">
                        <button onClick={() => handleCommentEdit(index)} className="editButton">수정</button>
                        <button onClick={() => handleCommentDelete(index)} className="deleteButton">삭제</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="arrowright" onClick={handleNextClick}>
        <FaAngleRight />
      </button>
    </div>
  );
};

export default FeedList;
