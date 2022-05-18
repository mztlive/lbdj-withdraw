import { createSignal } from "solid-js";

const Modal = (props) => {
  const [rejectMessage, setRejectMessage] = createSignal("");

  return (
    <div>
      <input
        type="checkbox"
        checked={props.InitStatus}
        id="reject-modal"
        class="modal-toggle"
      />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg mb-5">请输入你拒绝的理由</h3>
          <input
            type="text"
            placeholder="简短的理由，便于客户理解"
            class="input input-bordered input-lg w-full max-w-xs"
            value={rejectMessage()}
            onChange={(e) => {
              setRejectMessage(e.target.value);
            }}
          />
          <div class="modal-action">
            <button
              class="btn"
              onClick={() => {
                props.onCancel();
              }}
            >
              不，我再想想
            </button>
            <button
              class="btn btn-outline"
              onClick={() => {
                props.onOk(rejectMessage());
              }}
            >
              是的，我确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
