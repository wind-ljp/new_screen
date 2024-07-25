/* eslint-disable react-hooks/exhaustive-deps */
import { FC, MouseEvent, useCallback, useEffect, useMemo, ChangeEvent  } from 'react'
import { message, Tooltip, Modal } from 'antd'
import {
  CloseOutlined,
  ExclamationCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined
} from '@ant-design/icons'
// 配置文件
import configuration from '../../../../widget/tools/main'
// 获取组件分类
import { componentsClassify } from '../../../../widget'
// CreatePortal
import CreatePortal from '../../../../components/create-portal'
import { getFormData, guid } from '../../../../utils/tools'
import './index.scss'
import { IPage, IWidget, IScreen } from '../../../../store/actionType'
import { useHistory, useLocation } from 'react-router-dom'
import { addPost, editPost } from '../../../../service/screen'
import useUrlState from '@ahooksjs/use-url-state'
import { uploadPic } from '../../../../service/user'

// 组件配置文件
const { widgetConfiguration } = configuration

interface IDesignHeaderProps {
  addLargeScreenElement: (data: IWidget, groupId?: string) => void
  pastPage: IPage[]
  futurePage: IPage[]
  currentWidgetId: string
  currentWidget: IWidget
  currentPageId: string
  undoLargeScreen: () => void
  redoLargeScreen: () => void
  modifyLargeScreenElement: (id: string, groupId: string, data: IWidget) => void
  delLargeScreenElement: () => void
  copyLargeScreenElement: () => void
  currentWidgetGroupId: string
  group: () => void
  currentPage: IPage
  cancelGroup: () => void
  topLargescreenElement: () => void
  bottomLargescreenElement: () => void
  upLargescreenElement: () => void
  downLargescreenElement: () => void
  pages: IPage[]
  screen: IScreen
  changeLargeScreenElement: (id: string) => void
  modifyLargeScreenPage: (id: string, data: IPage, callback?: Function) => void
}

const DesignHeader: FC<IDesignHeaderProps> = ({
  addLargeScreenElement,
  currentPageId,
  pastPage,
  futurePage,
  currentWidgetId,
  currentWidget,
  undoLargeScreen,
  redoLargeScreen,
  modifyLargeScreenElement,
  currentWidgetGroupId,
  delLargeScreenElement,
  copyLargeScreenElement,
  group,
  cancelGroup,
  currentPage,
  topLargescreenElement,
  bottomLargescreenElement,
  upLargescreenElement,
  downLargescreenElement,
  pages,
  screen,
  changeLargeScreenElement,
  modifyLargeScreenPage
}) => {
  const history = useHistory()
  const location = useLocation()
  const [locationState] = useUrlState()
  // 向页面添加组件
  const addElement = (code: string) => {
    if (!currentPageId) {
      message.error('请先添加页面！')
      return
    }
    if (widgetConfiguration[code]) {
      addLargeScreenElement({
        id: guid(),
        linkageIds: '',
        ...widgetConfiguration[code]
      })
    } else {
      message.info('该组件正在开发中...')
    }
  }
  // 撤销
  const undoHander = useCallback(() => {
    if (pastPage.length) {
      undoLargeScreen()
    }
  }, [pastPage.length, undoLargeScreen])
  // 恢复
  const redoHandler = useCallback(() => {
    if (futurePage.length) {
      redoLargeScreen()
    }
  }, [futurePage.length, redoLargeScreen])

  // 删除
  const delHandler = useCallback(
    (e: MouseEvent) => {
      if (currentWidgetId && !currentWidgetId.includes(',')) {
        if (currentWidget.code === 'widgetSys') {
          message.error('无权限删除')
        } else if (currentWidget.code === 'widgetGroup') {
          const length = currentWidget.widgets.filter(
            (i) => i.code === 'widgetSys'
          ).length
          if (length) {
            message.error('组中含有无权限删除组件')
          } else {
            delLargeScreenElement()
            message.success('删除成功')
          }
        } else {
          delLargeScreenElement()
          message.success('删除成功')
        }
      }
    },
    [
      currentWidget.code,
      currentWidget.widgets,
      currentWidgetId,
      delLargeScreenElement
    ]
  )

  // 复制
  const copyHandler = useCallback(
    (e: MouseEvent) => {
      copyLargeScreenElement()
      message.success('复制成功')
    },
    [copyLargeScreenElement]
  )

  // 组合
  const groupHandler = useCallback(
    (e: MouseEvent) => {
      if (currentWidgetId && currentWidgetId.includes(',')) {
        group()
        message.success('组合成功')
      }
    },
    [currentWidgetId, group]
  )

  // 拆分
  const cancelGroupHandler = useCallback(
    (e: MouseEvent) => {
      if (currentWidgetId && currentWidgetGroupId === currentWidgetId) {
        cancelGroup()
        message.success('拆分成功')
      }
    },
    [currentWidgetId, currentWidgetGroupId, cancelGroup]
  )

  // 设置组件属性
  const setWidgetProperty = useCallback(
    (
      field:
        | 'width'
        | 'height'
        | 'wH'
        | 'left'
        | 'center'
        | 'right'
        | 'top'
        | 'middle'
        | 'bottom'
        | 'row'
        | 'column'
    ) => {
      if (currentWidgetId && currentWidgetId.includes(',') && field) {
        const handleWidgetArr: string[] = currentWidgetId.split(',') // 需要改变属性的组件的id
        handleWidgetArr.shift()
        let temp = []
        let sum: number // 中间项宽度和
        let space: number // 首尾项间距
        const width: number = currentPage.widgets.find(
          (i) => i.id === currentWidgetId.split(',')[0]
        )?.coordinateValue?.width
        const height: number = currentPage.widgets.find(
          (i) => i.id === currentWidgetId.split(',')[0]
        )?.coordinateValue?.height
        const left: number = currentPage.widgets.find(
          (i) => i.id === currentWidgetId.split(',')[0]
        )?.coordinateValue?.left
        const top: number = currentPage.widgets.find(
          (i) => i.id === currentWidgetId.split(',')[0]
        )?.coordinateValue?.top
        switch (field) {
          case 'width':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.width = width
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'height':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.height = height
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'wH':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.width = width
                  currentPage.widgets[i].coordinateValue.height = height
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'left':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.left = left
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'center':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.left =
                    left +
                    width / 2 -
                    currentPage.widgets[i].coordinateValue.width / 2
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'right':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.left =
                    left + width - currentPage.widgets[i].coordinateValue.width
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'top':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.top = top
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'middle':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.top =
                    top +
                    height / 2 -
                    currentPage.widgets[i].coordinateValue.height / 2
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'bottom':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < handleWidgetArr.length; j++) {
                if (currentPage.widgets[i].id === handleWidgetArr[j]) {
                  currentPage.widgets[i].coordinateValue.top =
                    top + height - currentPage.widgets[i].coordinateValue.height
                  modifyLargeScreenElement(
                    handleWidgetArr[j],
                    currentWidgetGroupId,
                    currentPage.widgets[i]
                  )
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'row':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < currentWidgetId.split(',').length; j++) {
                if (
                  currentPage.widgets[i].id === currentWidgetId.split(',')[j]
                ) {
                  temp.push(currentPage.widgets[i])
                }
              }
            }
            temp = temp.sort(
              (a, b) => a.coordinateValue.left - b.coordinateValue.left
            )
            space =
              temp[temp.length - 1].coordinateValue.left -
              temp[0].coordinateValue.left -
              temp[0].coordinateValue.width // 首尾两项之间间距
            temp.shift()
            temp.pop()
            sum = temp.reduce((c, R) => c + R.coordinateValue.width, 0) // 中间项宽度和
            if (sum < space) {
              // 间距大于中间项和，只操作中间项
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (currentPage.widgets[i].id === temp[j].id) {
                    currentPage.widgets[i].coordinateValue.left =
                      currentPage.widgets[i - 1].coordinateValue.left +
                      currentPage.widgets[i - 1].coordinateValue.width +
                      (space - sum) / (temp.length + 1)
                    modifyLargeScreenElement(
                      temp[j].id,
                      currentWidgetGroupId,
                      currentPage.widgets[i]
                    )
                  }
                }
              }
            } else {
              // 操作除首项外所有项
              temp = []
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < currentWidgetId.split(',').length; j++) {
                  if (
                    currentPage.widgets[i].id === currentWidgetId.split(',')[j]
                  ) {
                    temp.push(currentPage.widgets[i])
                  }
                }
              }
              temp = temp.sort(
                (a, b) => a.coordinateValue.left - b.coordinateValue.left
              )
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (currentPage.widgets[i].id === temp[j].id) {
                    if (currentPage.widgets[i + 1]) {
                      console.log(currentPage.widgets[i + 1])
                      currentPage.widgets[i + 1].coordinateValue.left =
                        currentPage.widgets[i].coordinateValue.left +
                        currentPage.widgets[i].coordinateValue.width
                    }
                    modifyLargeScreenElement(
                      temp[j].id,
                      currentWidgetGroupId,
                      currentPage.widgets[i]
                    )
                  }
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          case 'column':
            for (let i = 0; i < currentPage.widgets.length; i++) {
              for (let j = 0; j < currentWidgetId.split(',').length; j++) {
                if (
                  currentPage.widgets[i].id === currentWidgetId.split(',')[j]
                ) {
                  temp.push(currentPage.widgets[i])
                }
              }
            }
            temp = temp.sort(
              (a, b) => a.coordinateValue.top - b.coordinateValue.top
            )
            space =
              temp[temp.length - 1].coordinateValue.top -
              temp[0].coordinateValue.top -
              temp[0].coordinateValue.height // 首尾两项之间间距
            temp.shift()
            temp.pop()
            sum = temp.reduce((c, R) => c + R.coordinateValue.height, 0) // 中间项高度和
            if (sum < space) {
              // 间距大于中间项和，只操作中间项
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (currentPage.widgets[i].id === temp[j].id) {
                    currentPage.widgets[i].coordinateValue.top =
                      currentPage.widgets[i - 1].coordinateValue.top +
                      currentPage.widgets[i - 1].coordinateValue.height +
                      (space - sum) / (temp.length + 1)
                    modifyLargeScreenElement(
                      temp[j].id,
                      currentWidgetGroupId,
                      currentPage.widgets[i]
                    )
                  }
                }
              }
            } else {
              // 操作除首项外所有项
              temp = []
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < currentWidgetId.split(',').length; j++) {
                  if (
                    currentPage.widgets[i].id === currentWidgetId.split(',')[j]
                  ) {
                    temp.push(currentPage.widgets[i])
                  }
                }
              }
              temp = temp.sort(
                (a, b) => a.coordinateValue.top - b.coordinateValue.top
              )
              for (let i = 0; i < currentPage.widgets.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                  if (currentPage.widgets[i].id === temp[j].id) {
                    if (currentPage.widgets[i + 1]) {
                      console.log(currentPage.widgets[i + 1])
                      currentPage.widgets[i + 1].coordinateValue.top =
                        currentPage.widgets[i].coordinateValue.top +
                        currentPage.widgets[i].coordinateValue.height
                    }
                    modifyLargeScreenElement(
                      temp[j].id,
                      currentWidgetGroupId,
                      currentPage.widgets[i]
                    )
                  }
                }
              }
            }
            changeLargeScreenElement(currentWidgetId)
            break
          default:
            break
        }
      }
    },
    [currentWidgetId]
  )

  // 移动上移下移左移右移
  const moveHander = useCallback(
    (field: 'top' | 'left' | 'bottom' | 'right') => {
      if (currentWidgetId) {
        const newCurrentWidget = JSON.parse(JSON.stringify(currentWidget))
        switch (field) {
          case 'top':
            newCurrentWidget.coordinateValue.top =
              newCurrentWidget.coordinateValue.top - 1
            break
          case 'left':
            newCurrentWidget.coordinateValue.left =
              newCurrentWidget.coordinateValue.left - 1
            break
          case 'bottom':
            newCurrentWidget.coordinateValue.top =
              newCurrentWidget.coordinateValue.top + 1
            break
          default:
            newCurrentWidget.coordinateValue.left =
              newCurrentWidget.coordinateValue.left + 1
        }
        modifyLargeScreenElement(
          currentWidgetId,
          currentWidgetGroupId,
          newCurrentWidget
        )
      }
    },
    [
      currentWidgetId,
      currentWidget,
      currentWidgetGroupId,
      modifyLargeScreenElement
    ]
  )

  // 确认框
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showConfirm = (message: string, callback: Function) => {
    Modal.confirm({
      title: `您确定要${message}?`,
      icon: <ExclamationCircleOutlined />,
      content:
        message === '退出'
          ? '温馨提示：未保存的内容将会丢失！！！'
          : '温馨提示',
      onOk() {
        callback && callback()
      }
    })
  }

  const saveHandler = useCallback(() => {
    if (!currentPage.widgets.length) {
      message.info('需添加至少一个组件')
    } else {
      const tempPageList = pages
      tempPageList[tempPageList.length - 1] = currentPage
      const urlSearch = new URLSearchParams(location.search)
      if (urlSearch.get('id')) {
        let dimensionObj: {
          dimension?: string
        } = {}
        if (!screen.dimension) {
          dimensionObj.dimension = ''
        }
        const editScreen = {
          id: urlSearch.get('id'),
          ...screen,
          ...dimensionObj
        }
        if (locationState.type === 'screen') {
          editPost({ screen: editScreen, pages, type: 1 }).then(() => {
            message.success('修改成功')
            history.replace('/frame/report/big-screen')
            changeLargeScreenElement('')
          })
        }
        if (locationState.type === 'page') {
          editPost({ screen: editScreen, pages, type: 2 }).then(() => {
            message.success('修改成功')
            history.replace('/frame/report/home-page')
            changeLargeScreenElement('')
          })
        }
      } else {
        const addScreen = {
          ...screen
        }
        if (locationState.type === 'screen') {
          addPost({ screen: addScreen, pages, type: 1 }).then(() => {
            message.success('保存成功')
            history.replace('/frame/report/big-screen')
            changeLargeScreenElement('')
          })
        }
        if (locationState.type === 'page') {
          addPost({ screen: addScreen, pages, type: 2 }).then(() => {
            message.success('保存成功')
            history.replace('/frame/report/home-page')
            changeLargeScreenElement('')
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, history, location.search, pages, screen])

  useEffect(() => {
    const keyupHander = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case 90:
            if (e.altKey) {
              // 恢复
              redoHandler()
            } else {
              // 撤销
              undoHander()
            }
            break
          // 左移
          case 37:
            moveHander('left')
            break
          // 上移
          case 38:
            moveHander('top')
            break
          // 右移
          case 39:
            moveHander('right')
            break
          // 下移
          case 40:
            moveHander('bottom')
            break
          default:
        }
      } else {
        switch (e.keyCode) {
          // 删除
          case 46:
            if (currentWidgetId && !currentWidgetId.includes(',')) {
              showConfirm('删除', delHandler)
            }
            break
          default:
        }
      }
    }
    document.addEventListener('keyup', keyupHander)

    return () => {
      document.removeEventListener('keyup', keyupHander)
    }
  }, [
    undoHander,
    redoHandler,
    moveHander,
    delHandler,
    copyHandler,
    currentWidgetId,
    showConfirm
  ])

  // 上移一层
  const isUp = useMemo(() => {
    let flag = false
    if (!currentPage.widgets) {
      return flag
    }
    // 找组下标
    const groupIndex = currentPage.widgets.findIndex(
      (item) => item.id === currentWidgetGroupId
    )
    // 如果有组合，则找组合下面的widget
    if (groupIndex !== -1 && currentWidgetGroupId !== currentWidgetId) {
      if (
        currentPage.widgets[groupIndex].widgets.findIndex(
          (item) => item.id === currentWidgetId
        ) > 0
      ) {
        return true
      }
    } else if (
      currentPage.widgets.findIndex((item) => item.id === currentWidgetId) > 0
    ) {
      return true
    }

    return flag
  }, [currentPage, currentWidgetGroupId, currentWidgetId])

  // 上移一层
  const isDown = useMemo(() => {
    let flag = false
    if (!currentPage.widgets) {
      return flag
    }
    // 找组下标
    const groupIndex = currentPage.widgets.findIndex(
      (item) => item.id === currentWidgetGroupId
    )
    // 如果有组合，则找组合下面的widget
    if (groupIndex !== -1 && currentWidgetGroupId !== currentWidgetId) {
      if (
        currentPage.widgets[groupIndex].widgets.findIndex(
          (item) => item.id === currentWidgetId
        ) !=
        currentPage.widgets[groupIndex].widgets.length - 1
      ) {
        return true
      }
    } else if (
      currentPage.widgets.findIndex((item) => item.id === currentWidgetId) !==
      currentPage.widgets.length - 1
    ) {
      return true
    }

    return flag
  }, [currentPage, currentWidgetGroupId, currentWidgetId])

  const upChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadPic(
        getFormData({
          file: e.target.files[0]
        })
      ).then((res: any) => {
        if (res.code === 200) {
          let temp = currentWidget
          temp.dataValue.mock.data = res.data.url
          temp.dataValue.field = 'data'
          modifyLargeScreenElement(currentWidgetId, currentWidgetGroupId, temp)
          changeLargeScreenElement('')
        }
      })
    }
  }

  return (
    <div className='app-screen-disign__header'>
      <CreatePortal>
        <ul className='app-content-menu' id='js-content-menu'>
          <li
            onClick={copyHandler}
            className={`app-content-menu__item ${
              currentWidgetId && !currentWidgetId.includes(',')
                ? ''
                : 'is-disabled'
            }`}>
            <span className='app-icon'>&#xe7bc;</span>
            <span className='name'>复制图层</span>
          </li>
          <li
            onClick={() => showConfirm('删除', delHandler)}
            className={`app-content-menu__item is-border ${
              currentWidgetId && !currentWidgetId.includes(',')
                ? ''
                : 'is-disabled'
            }`}>
            <span className='app-icon'>&#xe7c3;</span>
            <span className='name'>删除图层</span>
          </li>
          <li
            onClick={() => {
              isUp && upLargescreenElement()
            }}
            className={`app-content-menu__item ${!isUp ? 'is-disabled' : ''}`}>
            <span className='app-icon'>&#xe7ef;</span>
            <span className='name'>上移一层</span>
          </li>
          <li
            onClick={() => {
              isDown && downLargescreenElement()
            }}
            className={`app-content-menu__item ${
              !isDown ? 'is-disabled' : ''
            }`}>
            <span className='app-icon'>&#xe7f1;</span>
            <span className='name'>下移一层</span>
          </li>

          <li
            onClick={() => {
              isUp && topLargescreenElement()
            }}
            className={`app-content-menu__item ${!isUp ? 'is-disabled' : ''}`}>
            <span className='app-icon'>&#xe786;</span>
            <span className='name'>置底图层</span>
          </li>

          <li
            onClick={() => {
              isDown && bottomLargescreenElement()
            }}
            className={`app-content-menu__item is-border ${
              !isDown ? 'is-disabled' : ''
            }`}>
            <span className='app-icon'>&#xe742;</span>
            <span className='name'>置顶图层</span>
          </li>
          <li
            onClick={groupHandler}
            className={`app-content-menu__item  ${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <span className='app-icon'>&#xe83f;</span>
            <span className='name'>组合</span>
          </li>
          <li
            onClick={cancelGroupHandler}
            className={`app-content-menu__item  ${
              currentWidgetGroupId && currentWidgetGroupId === currentWidgetId
                ? ''
                : 'is-disabled'
            }`}>
            <span className='app-icon'>&#xe632;</span>
            <span className='name'>拆分</span>
          </li>
          {/* {currentWidget && currentWidget.code === 'widgetImage' ? (
            <li
              className='app-content-menu__item'
              onClick={() => {
                let upimgs = document.getElementById('file555')
                upimgs?.click()
              }}>
              <span className='app-icon'>&#xe7de;</span>
              <span className='name'>替换图片</span>
            </li>
          ) : null} */}
          <input
            style={{ display: 'none' }}
            type='file'
            accept='image/*'
            id='file555'
            onChange={upChange}
          />
          <li
            onClick={() => {
              const temp = currentWidget
              const userInput =
                prompt('请输入组件名称:', temp.label) ?? temp.label
              temp.label = userInput
              modifyLargeScreenElement(
                currentWidgetId,
                currentWidgetGroupId,
                temp
              )
            }}
            className={`app-content-menu__item is-border ${
              currentWidgetId && !currentWidgetId.includes(',')
                ? ''
                : 'is-disabled'
            }`}>
            <span className='app-icon'>&#xe7c3;</span>
            <span className='name'>图层重命名</span>
          </li>
        </ul>
      </CreatePortal>
      {/* elements start */}
      {/* <ul className='app-screen-disign__header--left'>
        {componentsClassify.map((item: any, index: number) => (
          <li
            className={`${!currentPageId ? 'is-disabled' : ''}`}
            style={{
              display: window.chartPermission[item.permission]
                ? 'block'
                : 'none'
            }}
            onClick={() => {
              if (!item.datas) {
                addElement(item.widgetName)
              }
            }}
            key={item.type}>
            <span
              className='app-icon'
              dangerouslySetInnerHTML={{
                __html: item.icon
              }}></span>
            <p>{item.name}</p>
            {item.datas && item.datas.length ? (
              <div className='elements'>
                {item.datas.map((subItem: any, subIndex: string) => (
                  <div
                    style={{
                      display: window.chartPermission[subItem.permission]
                        ? 'block'
                        : 'none'
                    }}
                    onClick={() => {
                      if (subItem.widgetName) {
                        if (
                          (item.type === 'form' && currentWidgetGroupId) ||
                          item.type !== 'form'
                        ) {
                          addElement(subItem.widgetName)
                        } else {
                          message.warning('表单组件只能应用于组合中')
                        }
                      }
                    }}
                    key={subIndex}>
                    <div className='img'>
                      {subItem.src ? (
                        <img src={subItem.src} alt='' />
                      ) : (
                        <PictureOutlined />
                      )}
                    </div>
                    <div className='name' title={subItem.name}>
                      {subItem.name}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul> */}
      {/* elements end */}
      <div className='app-screen-disign__header--center'>
        <ul className='shortcuts-group'>
          <li
            onClick={groupHandler}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='组合' placement='bottom'>
              <span className='app-icon'>&#xe83f;</span>
              <p>组合</p>
            </Tooltip>
          </li>
          <li
            onClick={cancelGroupHandler}
            className={`${
              currentWidgetGroupId && currentWidgetGroupId === currentWidgetId
                ? ''
                : 'is-disabled'
            }`}>
            <Tooltip title='拆分' placement='bottom'>
              <span className='app-icon'>&#xe632;</span>
              <p>拆分</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            onClick={copyHandler}
            className={`${
              currentWidgetId && !currentWidgetId.includes(',')
                ? ''
                : 'is-disabled'
            }`}>
            <Tooltip title='复制' placement='bottom'>
              <span className='app-icon'>&#xe7bc;</span>
              <p>复制</p>
            </Tooltip>
          </li>
          <li
            onClick={() => showConfirm('删除', delHandler)}
            className={`${
              currentWidgetId && !currentWidgetId.includes(',')
                ? ''
                : 'is-disabled'
            }`}>
            <Tooltip title='删除(delete)' placement='bottom'>
              <span className='app-icon'>&#xe7c3;</span>
              <p>删除</p>
            </Tooltip>
          </li>
        </ul>
        {/* <ul className='shortcuts-group'>
          <li
            onClick={undoHander}
            className={`${!pastPage.length ? 'is-disabled' : ''}`}>
            <Tooltip title="撤销(ctrl+z)" placement="bottom">
              <RotateLeftOutlined />
              <p>撤销</p>
            </Tooltip>
          </li>
          <li
            onClick={redoHandler}
            className={`${!futurePage.length ? 'is-disabled' : ''}`}>
            <Tooltip title="恢复(ctrl+alt+z)" placement="bottom">
              <RotateRightOutlined />
              <p>恢复</p>
            </Tooltip>
          </li>
        </ul> */}
        <ul className='shortcuts-group'>
          <li
            onClick={() => setWidgetProperty('left')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='左对齐' placement='bottom'>
              <span className='app-icon'>&#xe92;</span>
              <p>左对齐</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('center')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='水平居中' placement='bottom'>
              <span className='app-icon'>&#xe91;</span>
              <p>居中</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('right')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='右对齐' placement='bottom'>
              <span className='app-icon'>&#xe93;</span>
              <p>右对齐</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            onClick={() => setWidgetProperty('top')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='顶对齐' placement='bottom'>
              <span className='app-icon'>&#xeb6e;</span>
              <p>顶对齐</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('middle')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='垂直居中' placement='bottom'>
              <span className='app-icon'>&#xe94;</span>
              <p>居中</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('bottom')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='底对齐' placement='bottom'>
              <span className='app-icon'>&#xeb6f;</span>
              <p>底对齐</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            onClick={() => setWidgetProperty('width')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='等宽' placement='bottom'>
              <span className='app-icon'>&#xeb6c;</span>
              <p>等宽</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('height')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='等高' placement='bottom'>
              <span className='app-icon'>&#xeb6b;</span>
              <p>等高</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('wH')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='全等' placement='bottom'>
              <span className='app-icon'>&#xeb6d;</span>
              <p>全等</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            onClick={() => setWidgetProperty('row')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='水平间距相等' placement='bottom'>
              <span className='app-icon'>&#xe95;</span>
              <p>水平相等</p>
            </Tooltip>
          </li>
          <li
            onClick={() => setWidgetProperty('column')}
            className={`${
              currentWidgetGroupId || !currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='垂直间距相等' placement='bottom'>
              <span className='app-icon'>&#xe96;</span>
              <p>垂直相等</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            onClick={() => moveHander('top')}
            className={`${
              !currentWidgetId || currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='上移(ctrl+↑)' placement='bottom'>
              <span className='app-icon'>&#xe7ef;</span>
              <p>上移</p>
            </Tooltip>
          </li>
          <li
            onClick={() => moveHander('bottom')}
            className={`${
              !currentWidgetId || currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='下移(ctrl+↓)' placement='bottom'>
              <span className='app-icon'>&#xe7f1;</span>
              <p>下移</p>
            </Tooltip>
          </li>
          <li
            onClick={() => moveHander('left')}
            className={`${
              !currentWidgetId || currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='左移(ctrl+←)' placement='bottom'>
              <span className='app-icon'>&#xe7f0;</span>
              <p>左移</p>
            </Tooltip>
          </li>
          <li
            onClick={() => moveHander('right')}
            className={`${
              !currentWidgetId || currentWidgetId.includes(',')
                ? 'is-disabled'
                : ''
            }`}>
            <Tooltip title='右移(ctrl+→)' placement='bottom'>
              <span className='app-icon'>&#xe7ee;</span>
              <p>右移</p>
            </Tooltip>
          </li>
        </ul>
        <ul className='shortcuts-group'>
          <li
            className={`${!currentPageId ? 'is-disabled' : ''}`}
            onClick={saveHandler}>
            <Tooltip title='保存' placement='bottom'>
              <span className='app-icon'>&#xe791;</span>
              <p>保存</p>
            </Tooltip>
          </li>
          <li
            onClick={() => {
              if (currentPageId) {
                // history.push(`/frame/preview?pageId=${currentPageId}`)
                window.open(`/#/frame/preview?pageId=${currentPageId}`)
              }
            }}
            className={`${!currentPageId ? 'is-disabled' : ''}`}>
            <Tooltip title='预览' placement='bottom'>
              <span className='app-icon'>&#xe78f;</span>
              <p>预览</p>
            </Tooltip>
          </li>
        </ul>
      </div>
      <ul className='app-screen-disign__header--right'>
        <li
          onClick={() =>
            showConfirm('退出', () => {
              history.goBack()
              changeLargeScreenElement('')
            })
          }>
          <CloseOutlined />
        </li>
      </ul>
    </div>
  )
}

export default DesignHeader
