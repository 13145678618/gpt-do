import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'
import { useEffect, useRef } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  const systemInputRef = useRef<HTMLTextAreaElement>()

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.current.value)
    props.setSystemRoleEditing(false)
  }

  useEffect(() => {
    if (!props.currentSystemRoleSettings()) {
      props.setCurrentSystemRoleSettings('default')  // 设置默认系统角色
    }
  }, [])  // 仅在组件挂载时执行一次

  const defaultSystemPrompt = 'You are a helpful assistant, answer as concisely as possible....';
  const currentSystemPrompt = props.currentSystemRoleSettings() || defaultSystemPrompt;  // 获取当前系统提示文本，如果为空则使用默认文本

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>System Role: </span>
            </div>
            <div class="mt-1">
              {currentSystemPrompt}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>System Role:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">Gently instruct the assistant and set the behavior of the assistant.</p>
          <div>
            <textarea
              ref={systemInputRef}
              placeholder={defaultSystemPrompt}  // 设置默认系统提示文本
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
