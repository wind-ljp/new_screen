/*
 * @Author: liaojingping
 * @Date: 2023-02-03 11:15:26
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:02:28
 * @FilePath: \配置大屏\src\pages\report\homePage\index.tsx
 * @Description: 屏幕表格列表页
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { FC, useRef, useState, useEffect } from 'react'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import tableConfig from '../../../config/table-config'
import { ALL_STATE } from '../../../store/actionType'
import { connect } from 'react-redux'
import { getStrategy } from '../../../store/actions/authorization'
import { IAnyObject } from '../../../types'
import { Button, Modal, Form, Input, message, Upload } from 'antd'
import { PlusOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getLargeScreenPages } from '../../../store/actions/largeScreen'
import PopConfirm from '../../../components/pop-confirm'
import { FileTools, getFormData, guid } from '../../../utils/tools'
import { getList, setScreenIndex, addPost } from '../../../service/screen'
import { UploadOutlined } from '@ant-design/icons'

// 表格字段的类型
interface TableItem extends IAnyObject {
  id: number
  title: string
}

interface IBigScreenProps {
  strategy: IAnyObject
  getStrategy: (key: string) => void
  path: string
  getLargeScreenPages: (data: any, callback?: Function) => void
  userinfo: IAnyObject
}

const BigScreen: FC<IBigScreenProps> = ({
  strategy,
  getStrategy,
  path,
  getLargeScreenPages,
  userinfo
}) => {
  // 获取策略
  useEffect(() => {
    getStrategy(path)
  }, [path, getStrategy])

  useEffect(() => {
    document.title = window.listTitle
  }, [])

  const history = useHistory()
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false) // 文件弹窗
  const [screenMsg, setScreenMsg] = useState<Record<string, any>>({})
  const [file, setFile] = useState<any>(null)
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  // const isAdmin = userinfo.roleType !== 0
  const permissionList = userinfo.systemPermissionList.filter(
    // 权限
    (i: { subsystemId: number }) => i.subsystemId === 8
  )

  const prop: any = {
    maxCount: 1,
    accept: '.json',
    beforeUpload(files: File) {
      setFile(files)
      return false
    }
  }

  const handleOk = () => {
    form.validateFields().then((value: { title: string }) => {
      const copyMsg: any = { ...screenMsg }
      copyMsg.screen.title = value.title
      addPost(copyMsg).then(() => {
        message.success('复制成功')
        setIsModalOpen(false)
        actionRef?.current?.reload()
      })
    })
  }

  const handleOk2 = () => {
    form2.validateFields().then((res) => {
      FileTools.readJson(file).then((result: any) => {
        result.title = res.name
        const pages = result.pages
        delete result.pages
        if (result.type === 1) {
          message.warning('大屏管理导出的模板不能应用于此')
          return
        }
        addPost({
          pages,
          screen: result,
          type: result.type
        }).then(() => {
          message.success('导入成功')
          setIsModalOpen2(false)
          actionRef?.current?.reload()
        })
      })
    })
  }

  // 表格columns
  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: '屏幕名称',
      dataIndex: 'title',
      ellipsis: true,
      tip: '标题过长会自动收缩',
      fieldProps: {
        placeholder: '请输入标题'
      }
    },
    {
      title: '屏幕描述',
      dataIndex: 'description',
      ellipsis: true,
      search: false
    },
    {
      title: '屏幕尺寸',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
      render(dom, record, index, action, schema) {
        return (
          <>
            {record.width}*{record.height}
          </>
        )
      }
    },
    {
      title: '屏幕比例',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
      render(dom, record, index, action, schema) {
        return (
          <>
            {record.horizontalNumber}*{record.verticalNumber}
          </>
        )
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1]
          }
        }
      }
    },
    {
      title: '操作',
      search: false,
      width: 275,
      render(dom, record: any, index, action, schema) {
        return (
          <div className='app-table__operation'>
            {Array.isArray(permissionList) ? (
              permissionList.length ? (
                permissionList.find((i) => i.permissionCode === 'edit') ? (
                  record.agencyId === -1 && userinfo.roleType !== 2 ? null : (
                    <span
                      onClick={() => {
                        getLargeScreenPages({
                          pages: record.pages,
                          screen: {
                            auxiliaryBorderColor: record.auxiliaryBorderColor,
                            backgroundColor: record.backgroundColor,
                            backgroundImage: record.backgroundImage,
                            description: record.description,
                            height: record.height,
                            horizontalNumber: record.horizontalNumber,
                            interval: record.interval,
                            showAuxiliary: record.showAuxiliary,
                            title: record.title,
                            verticalNumber: record.verticalNumber,
                            width: record.width,
                            dimension: record.dimension,
                            threeModelSource: record.threeModelSource,
                            agencyId: record.agencyId,
                            posCamera: record.posCamera,
                            axisList: record.axisList,
                            turnList: record.turnList,
                            showPic: record.showPic,
                            showArea: record.showArea,
                            setMapArea: record.setMapArea,
                            center: record.center
                          },
                          pastPage: [],
                          futurePage: []
                        })
                        history.push(
                          `/frame/configuration?id=${record.id}&type=page`
                        )
                      }}
                      className='link'>
                      编辑
                    </span>
                  )
                ) : null
              ) : null
            ) : null}

            {Array.isArray(permissionList) ? (
              permissionList.length ? (
                permissionList.find((i) => i.permissionCode === 'del') ? (
                  record.agencyId === -1 && userinfo.roleType !== 2 ? null : (
                    <PopConfirm
                      text='删除'
                      params={{
                        ids: record.id
                      }}
                      reload={actionRef.current?.reloadAndRest}></PopConfirm>
                  )
                ) : null
              ) : null
            ) : null}

            <span
              onClick={() => {
                getLargeScreenPages(
                  {
                    pages: record.pages,
                    screen: {
                      auxiliaryBorderColor: record.auxiliaryBorderColor,
                      backgroundColor: record.backgroundColor,
                      backgroundImage: record.backgroundImage,
                      description: record.description,
                      height: record.height,
                      horizontalNumber: record.horizontalNumber,
                      interval: record.interval,
                      showAuxiliary: record.showAuxiliary,
                      title: record.title,
                      verticalNumber: record.verticalNumber,
                      width: record.width,
                      dimension: record.dimension,
                      threeModelSource: record.threeModelSource
                    }
                  },
                  () => {
                    window.open(`/#/frame/preview?id=${record.id}`)
                    // history.push(`/frame/preview?id=${record.id}`)
                  }
                )
              }}
              className='link'>
              预览
            </span>
            <span className='link'>
              {record.showIndex ? (
                <span style={{ color: 'red' }}>首页</span>
              ) : Array.isArray(permissionList) ? (
                permissionList.length ? (
                  permissionList.find((i) => i.permissionCode === 'top') ? (
                    <span
                      onClick={() => {
                        if (record.agencyId === -1) {
                          message.info('模板页不能设置为首页')
                        } else {
                          setScreenIndex(getFormData({ id: record.id })).then(
                            () => {
                              message.success(
                                `已将《${record.title}》置为首页并置顶`
                              )
                              actionRef?.current?.reload()
                            }
                          )
                        }
                      }}>
                      置为首页
                    </span>
                  ) : null
                ) : null
              ) : null}
            </span>

            {Array.isArray(permissionList) ? (
              permissionList.length ? (
                permissionList.find((i) => i.permissionCode === 'out') ? (
                  <span
                    className='link'
                    onClick={() => {
                      const temp = { ...record }
                      delete temp.id
                      delete temp.showIndex
                      FileTools.exportJson(
                        `${record.title || record.id}.json`,
                        JSON.stringify(temp)
                      )
                    }}>
                    导出
                  </span>
                ) : null
              ) : null
            ) : null}

            {Array.isArray(permissionList) ? (
              permissionList.length ? (
                permissionList.find((i) => i.permissionCode === 'copy') ? (
                  <span
                    className='link'
                    onClick={() => {
                      const copyObj: any = { ...record }
                      delete copyObj.id
                      delete copyObj.title
                      delete copyObj.pages
                      setIsModalOpen(true)
                      setScreenMsg({
                        screen: copyObj,
                        pages: record.pages
                      })
                    }}>
                    复制
                  </span>
                ) : null
              ) : null
            ) : null}
          </div>
        )
      }
    }
  ]

  // 选中的数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  // table复选框
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const addProject = () => {
    getLargeScreenPages({
      pages: [
        {
          id: guid(),
          name: `页面${guid().slice(1, 5)}`,
          widgets: [
            {
              id: guid(),
              linkageIds: '',
              code: 'widgetSys',
              label: '子系统',
              type: 'sys',
              configureValue: {
                styleDisplay: 'block',
                styleFontSize: 16,
                styleColor: '#fff',
                styleFontFamily: 'SimSun',
                styleFontWeight: 'normal',
                styleLetterSpacing: 0,
                componentType: 'comp1',
                leftDistance: 10,
                bottomDistance: 0
              },
              coordinateValue: {
                left: 768,
                top: 3,
                width: 940,
                height: 80
              },
              dataValue: {
                useInterface: false,
                dataType: 'mock',
                mock: {},
                url: '',
                method: 'post',
                field: 'data',
                params: {
                  key: ''
                }
              }
            }
          ]
        }
      ],
      screen: {
        width: 1920,
        height: 1080,
        backgroundColor: '#090548',
        title: '大屏名称',
        description: '大屏描述',
        auxiliaryBorderColor: '#1890ff',
        showAuxiliary: true,
        backgroundImage: '',
        horizontalNumber: 4,
        verticalNumber: 3,
        interval: 10,
        dimension: null,
        posCamera: null,
        axisList: null,
        turnList: null,
        showPic: null,
        showArea: null,
        setMapArea: null,
        center: null
      },
      currentWidgetId: '',
      pastPage: [],
      futurePage: []
    })
    history.push('/frame/configuration?type=page')
  }
  return (
    <>
      <Modal
        title='导入屏幕'
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={() => setIsModalOpen2(false)}>
        <Form name='import' form={form2} autoComplete='off'>
          <Form.Item
            label='屏幕名称'
            name='name'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='文件'
            name='file'
            valuePropName='file'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Upload {...prop}>
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='复制屏幕'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}>
        <Form name='basic' form={form} autoComplete='off'>
          <Form.Item
            label='屏幕名称'
            name='title'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <ProTable<TableItem>
        {...tableConfig}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={false}
        request={async (params = {}, sort, filter) => {
          const result = await getList()
          const data = result.data
            .map((i: { pages: any; screen: any }) => {
              return {
                pages: i.pages,
                ...i.screen
              }
            })
            .filter((i: any) => i.type === 2)
          return {
            data
          }
        }}
        // rowSelection={{ ...rowSelection }}
        toolBarRender={() => {
          const arr = [
            Array.isArray(permissionList) && permissionList.length ? (
              permissionList.find((i) => i.permissionCode === 'add') ? (
                <Button
                  key='button'
                  icon={<PlusOutlined />}
                  onClick={addProject}
                  type='primary'>
                  添加
                </Button>
              ) : null
            ) : null,
            Array.isArray(permissionList) && permissionList.length ? (
              permissionList.find((i) => i.permissionCode === 'in') ? (
                <Button
                  key='import'
                  icon={<VerticalAlignTopOutlined />}
                  type='default'
                  onClick={() => setIsModalOpen2(true)}>
                  导入
                </Button>
              ) : null
            ) : null
          ]
          return arr
        }}
        tableAlertRender={false}
        pagination={false}></ProTable>
    </>
  )
}

const mapStateToProps = (state: ALL_STATE) => ({
  strategy: state.authorization.strategy,
  userinfo: state.userinfo
})

const mapDispatchToProps = {
  getStrategy,
  getLargeScreenPages
}

export default connect(mapStateToProps, mapDispatchToProps)(BigScreen)
