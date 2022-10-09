import React, { useCallback, useRef, useState } from 'react';
import {
  EmptyText,
  ImgWrapper,
  InputWrapper,
  LayoutContainer,
  Main,
  ProfileWrapper,
  SideBar,
  UserImg,
  UserName,
  UserText,
  WindImg,
} from './styled';
import TodoInsult from '../../components/Todo/TodoInsult';
import TodoList from '../../components/Todo/TodoList';
import Nothing from './Nothing';
import TodayList from '../../components/TodayList';

const Home = () => {
  //임시로 넣어둔 todo 리스트
  const [todos, setTodos] = useState([]);
  /*
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: '아침밥 먹기',
      checked: false,
      memo: '',
      date: '',
    },
    {
      id: 2,
      content: '점심밥 먹기',
      checked: true,
      memo: '',
      date: '',
    },
    {
      id: 3,
      content: '저녁밥 먹기',
      checked: false,
      memo: '',
      date: '',
    },
  ]);
  */

  const nextId = useRef(4);
  //todo 추가 함수
  const onInsert = useCallback(
    (content) => {
      const todo = {
        id: nextId.current,
        content,
        checked: false,
        //memo,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );
  //todo 삭제 함수
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );
  //완료 상태 변경 함수
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  //조건부 렌더링
  let show;
  if (todos.length !== 0) {
    //todos에 값이 하나라도 있는 경우 TodoList 화면 띄움
    show = <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />;
  } else {
    //todos에 값이 하나도 없을 경우 Nothing 화면 띄움
    show = <Nothing />;
  }
  return (
    <LayoutContainer>
      {/* 화면 좌측의 사이드바 */}
      <SideBar>
        <ProfileWrapper>
          <UserImg />
          <UserName>MiniMini</UserName>
          <UserText>🍀 시간이 금이다!</UserText>
        </ProfileWrapper>
        <TodayList todos={todos} />
      </SideBar>
      {/* 화면의 메인 */}
      <Main>
        {/* todo 입력창 */}
        <InputWrapper>
          <TodoInsult onInsert={onInsert} />
        </InputWrapper>

        {/* 조건부 렌더링에 따라 다른 화면을 보여주는 변수 */}
        {show}
      </Main>
    </LayoutContainer>
  );
};

export default Home;
