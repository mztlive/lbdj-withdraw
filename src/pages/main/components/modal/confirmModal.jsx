import { createSignal } from "solid-js";

const Modal = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.InitStatus}
        id="confirm-modal"
        class="modal-toggle"
      />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">你确定已经打款了吗？</h3>
          <p class="py-4">请谨慎操作，避免引起和客户的纠纷</p>
          <div class="modal-action">
            <button
              class="btn"
              onClick={() => {
                props.onCancel();
              }}
            >
              不，还没有
            </button>
            <button
              class="btn btn-outline"
              onClick={() => {
                props.onOk();
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
