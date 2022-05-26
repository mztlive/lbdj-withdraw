import { createSignal } from "solid-js";

import { modalOpened, modalBoxOpened } from "./modal.module.css";

const Modal = (props) => {
  return (
    <div class="modal" classList={{ [modalOpened]: props.InitStatus == true }}>
      <div
        class="modal-box"
        classList={{ [modalBoxOpened]: props.InitStatus == true }}
      >
        <h3 class="font-bold text-lg">你确定已经打款了吗？</h3>
        <p class="py-4">请谨慎操作，避免引起和客户的纠纷</p>
        <div class="modal-action">
          <button
            class="btn mr-5"
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
  );
};

export default Modal;
