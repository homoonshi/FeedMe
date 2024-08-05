import React, { useState } from 'react';
import './FeedList.css';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaHeart } from 'react-icons/fa';
import '../../assets/font/Font.css' 
import photo1 from '../../assets/images/test1.png';
import photo2 from '../../assets/images/test2.png';
import photo3 from '../../assets/images/test3.png';
import '../../assets/font/Font.css' 

const initialPhotos = [
  { src: photo1, caption: '불사조', comments: [], author: '작성자1', time: '8월 1일 12:00', likes: 0 },
  { src: photo2, caption: '산책', comments: [], author: '작성자2', time: '8월 2일 14:30', likes: 0 },
  { src: photo3, caption: '판다', comments: [], author: '작성자3', time: '8월 3일 16:45', likes: 0 },
];

const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString('ko-KR', options);
};

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
      const commentData = {
        text: newComment,
        author: '댓글작성자', 
        time: formatDate(new Date()) 
      };
      updatedPhotos[currentIndex].comments.push(commentData);
      setPhotos(updatedPhotos);
      setNewComment('');
    }
  };

  const handleEditCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleCommentEdit = (index) => {
    setEditingComment(index);
    setEditedComment(photos[currentIndex].comments[index].text);
    setShowOptions(null);
  };

  const handleCommentSave = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[currentIndex].comments[index].text = editedComment;
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

  const handleLikeClick = () => { 
    const updatedPhotos = [...photos];
    updatedPhotos[currentIndex].likes += 1;
    setPhotos(updatedPhotos);
  };

  return (
    <div className="FeedList">
      <button className="arrowleft" onClick={handlePrevClick}>
        <FaAngleLeft />
      </button>      
      
      <div className="FeedListPhoto">
        <div className="FeedListPhotoHeader">
          <span className="FeedListPhotoauthor">{photos[currentIndex].author}</span> 
          <span className="FeedListPhototime">{photos[currentIndex].time}</span> 
        </div>
        <img src={photos[currentIndex].src} alt="feed" className="FeedListImg" />
        <p className="FeedListCaption">{photos[currentIndex].caption}</p>
        <div className="FeedListPhotolikeSection"> 
          <FaHeart onClick={handleLikeClick} className="FeedListPhotolikeButton" />
          <span>{photos[currentIndex].likes}</span>
        </div>
      </div>

      <div className="FeedListCom">
        <form onSubmit={handleCommentSubmit} className="FeedListcommentForm">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요..."
            className="FeedListCommentInput"
          />
          <button type="submit" className="commentButton">등록</button>
        </form>
        <ul className="commentsList">
          {photos[currentIndex].comments.map((comment, index) => (
            <li key={index} className="commentItem">
              {editingComment === index ? (
                <div className="editCommentContainer"> 
                  <input
                    type="text"
                    value={editedComment}
                    onChange={handleEditCommentChange}
                    className="editCommentInput"
                  />
                  <button onClick={() => handleCommentSave(index)} className="saveButton">저장</button>
                </div>
              ) : (
                <>
                  <div className="commentHeader">
                    <span className="commentAuthor">{comment.author}</span>
                    <span className="commentTime">{comment.time}</span>
                  </div>
                  <div className="commentBody">
                    <span className="commentText">{comment.text}</span>
                    <FaEllipsisH onClick={() => handleShowOptions(index)} className="ellipsisButton" />
                  </div>
                </>
              )}
              {showOptions === index && (
                <div className="optionsDropdown">
                  <button onClick={() => handleCommentEdit(index)} className="editButton">수정</button>
                  <button onClick={() => handleCommentDelete(index)} className="deleteButton">삭제</button>
                </div>
              )}
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
