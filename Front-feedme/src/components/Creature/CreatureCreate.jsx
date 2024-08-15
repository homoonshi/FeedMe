import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatureName, setKeyword } from '../../store/slice';
import './CreatureCreate.css';
import '../../assets/font/Font.css';
import axios from 'axios';

const CreatureCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatureName, keyword, token } = useSelector((state) => state.auth);
  const [photo, setPhoto] = useState(null); // local state로 photo 관리

  // 이미지 리사이징 함수
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          console.log('Original Image Size:', width, 'x', height);  // 원본 이미지 크기 출력

          // 이미지 크기를 720으로 리사이즈
          if (width > height && width > maxWidth) {
            height = Math.floor((height *= maxWidth / width));
            width = maxWidth;
          } else if (height > width && height > maxHeight) {
            width = Math.floor((width *= maxHeight / height));
            height = maxHeight;
          } else if (width > maxWidth) {
            width = maxWidth;
            height = maxHeight;
          }

          console.log('Resized Image Size:', width, 'x', height);  // 리사이즈된 이미지 크기 출력

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(resolve, file.type);
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 리사이징 수행
      const resizedImage = await resizeImage(file, 1024, 1024);
      setPhoto(resizedImage); // 리사이징된 파일로 photo 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('creatureName', creatureName);
    formData.append('keyword', keyword);
    if (photo) {
      formData.append('file', photo); // 리사이즈된 파일을 FormData에 추가
    }

    try {
      const response = await axios.post('https://i11b104.p.ssafy.io/api/creature', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': sessionStorage.getItem('accessToken'), // 또는 token 변수를 사용
        }
      });

      if (response.status === 200) {
        console.log('res : ', response);
        navigate('/CreatureResult');
      } else {
        console.log('크리쳐 생성 실패', response.data);
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생', error);
    }
  };

  return (
    <div className="CreatureCreateMain">
      <div className="CreatureCreateFormContainer">
        <Link to="/Signup" className="backButton">
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        </Link>
        <div className="CreatureCreateMainHeader">아바타 생성하기</div>
        <form className="CreatureCreateForm" onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="CreatureCreateFormNicknameContainer">
            <label htmlFor="nickname" className="CreatureCreateFormNickname">이ㅤ름</label>
            <input
              className="CreatureCreateFormNicknameInput"
              type="text"
              id="nickname"
              value={creatureName}
              onChange={(e) => dispatch(setCreatureName(e.target.value))}
            />
          </div>

          <div className="CreatureCreateFormImageUploadContainer">
            <label htmlFor="imageUpload" className="CreatureCreateFormImageUploadLabel">사ㅤ진</label>
            <input
              className="CreatureCreateFormImageUpload"
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {photo && (
            <div className="CreatureCreateFormImagePreviewContainer">
              <img src={URL.createObjectURL(photo)} alt="Preview" className="CreatureCreateFormImagePreview" />
            </div>
          )}
          <button type="submit" className="CreatureCreateButton">생성</button>
        </form>
      </div>
    </div>
  );
};

export default CreatureCreate;
