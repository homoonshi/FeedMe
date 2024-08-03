import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './CreatureCreate.css';
import '../../assets/font/Font.css';

// function Checkbox({ children, disabled, checked, onChange }) {
//   return (
//     <label>
//       <input
//         type="checkbox"
//         disabled={disabled}
//         checked={checked}
//         onChange={({ target: { checked } }) => onChange(checked)}
//       />
//       {children}
//     </label>
//   );
// }

const CreatureCreate = () => {
  const [nickname, setNickname] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [image, setImage] = useState(null);

  const handleKeywordChange = (keyword) => {
    setSelectedKeywords((prevKeywords) =>
      prevKeywords.includes(keyword)
        ? prevKeywords.filter((kw) => kw !== keyword)
        : [...prevKeywords, keyword]
    );
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="CreatureCreateMain">
      <div className="CreatureCreateFormContainer">
        <Link to="/Signup" className="backButton">
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        </Link>
        <div className="CreatureCreateMainHeader">아바타 생성하기</div>
        <form className="CreatureCreateForm">
          <div className="CreatureCreateFormNicknameContainer">
            <label htmlFor="nickname" className="CreatureCreateFormNickname">이ㅤ름</label>
            <input
              className="CreatureCreateFormNicknameInput"
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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

          {image && (
            <div className="CreatureCreateFormImagePreviewContainer">
              <img src={image} alt="Preview" className="CreatureCreateFormImagePreview" />
            </div>
          )}

          <div className="CreatureCreateFormKeywordsContainer">
            <label className="CreatureCreateFormKeywordsHeader">키워드</label>
            <div className="CreatureCreateFormKeywords">
              <div className="CreatureCreateFormKeywordOption">
                <input
                  type="checkbox"
                  id="cute"
                  checked={selectedKeywords.includes('cute')}
                  onChange={() => handleKeywordChange('cute')}
                />
                <label htmlFor="cute">귀여움</label>
              </div>
              <div className="CreatureCreateFormKeywordOption">
                <input
                  type="checkbox"
                  id="innocent"
                  checked={selectedKeywords.includes('innocent')}
                  onChange={() => handleKeywordChange('innocent')}
                />
                <label htmlFor="innocent">순수함</label>
              </div>
              <div className="CreatureCreateFormKeywordOption">
                <input
                  type="checkbox"
                  id="bright"
                  checked={selectedKeywords.includes('bright')}
                  onChange={() => handleKeywordChange('bright')}
                />
                <label htmlFor="bright">밝음</label>
              </div>
              <div className="CreatureCreateFormKeywordOption">
                <input
                  type="checkbox"
                  id="joy"
                  checked={selectedKeywords.includes('joy')}
                  onChange={() => handleKeywordChange('joy')}
                />
                <label htmlFor="joy">기쁨</label>
              </div>
            </div>
          </div>

          <Link to="/CreatureResult">
            <button type="submit" className="CreatureCreateButton">생성</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatureCreate;
