import React from 'react';

function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
}

const CreatureCreate = () => {
  return (
    <div>
      <h1>아바타 생성하기</h1>
      <p>이름<input></input></p>
      <p>사진<input type="file" accept="image/*" /></p>
      <p>키워드 선택</p>
      <div>
        <Checkbox >귀여움</Checkbox>
        <Checkbox>순수함</Checkbox>
        <Checkbox>똑똑함</Checkbox>
        <Checkbox>밝음</Checkbox>
        <Checkbox>용감함</Checkbox>
        <Checkbox>기쁨</Checkbox>
      </div>
    </div>
  );
};

export default CreatureCreate;