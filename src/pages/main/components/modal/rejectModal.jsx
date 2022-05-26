import { createSignal } from "solid-js";

import { modalOpened, modalBoxOpened } from "./modal.module.css";

const Modal = (props) => {
  const [rejectMessage, setRejectMessage] = createSignal("");

  return (
    <div class="modal" classList={{ [modalOpened]: props.InitStatus == true }}>
      <div
        class="modal-box"
        classList={{ [modalBoxOpened]: props.InitStatus == true }}
      >
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
            class="btn mr-5"
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
  );
};

export default Modal;
