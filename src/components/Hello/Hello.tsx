type HelloPropTypes = {
  /** 보여주고 싶은 이름 */
  name: string;
  /** 이 값을 'true'로 설정하면 h1 태그로 렌더링됩니다. */
  big: boolean;
  /** Hello 버튼 클릭하면 호출할 함수 */
  onHello: () => void;
};

/**
 * 안녕하세요 라고 보여주고 싶을 땐 `Hello` 컴포넌트를 사용하세요.
 *
 * - `big` 값을 `true`로 설정하면 **크게** 나타납니다.
 * - `onHello`를 설정하여 Hello 버튼이 클릭했을 때 호출 할 함수를 지정 할 수 있습니다.
 */

const Hello = ({ name, big, onHello }: HelloPropTypes) => {
  return (
    <div>
      {big ? <h1>안녕하세요, {name}!</h1> : <p>안녕하세요, {name}!</p>}
      <div>
        <button onClick={onHello}>Hello</button>
      </div>
    </div>
  );
};

export default Hello;
