import "./index.css";

const Message = ({ message, messageError }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={messageError ? "message error" : "message"}>{message}</div>
  );
};

export default Message;
