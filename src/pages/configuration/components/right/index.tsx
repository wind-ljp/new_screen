import DataSourceSet from '../../../report/dataSource'
import { IAnyObject } from '../../../../types'
import BMF from 'browser-md5-file'
import React, { FC, MouseEvent, useEffect, useMemo, useState } from 'react'
import { SketchPicker } from 'react-color'
import { GradientPicker } from 'react-linear-gradient-picker'
import 'react-linear-gradient-picker/dist/index.css'
import { useLocation } from 'react-router-dom'
import Area from './area'
import Turn from './turn'

import {
  EyeInvisibleOutlined, EyeOutlined, FolderOpenOutlined, FolderOutlined, LeftOutlined,
  RightOutlined, UploadOutlined
} from '@ant-design/icons'
import { IPage, IScreen, IWidget } from '../../../../store/actionType'
import { contentMenuHandler, getFormData, splitFile } from '../../../../utils/tools'
import type { UploadProps } from 'antd'
import {
  Button,
  Col,
  Collapse,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Progress,
  Row,
  Select,
  Slider,
  Switch,
  Table,
  Tabs,
  Upload,
  message
} from 'antd'
import { ChromePicker } from 'react-color'
import './index.scss'
// 配置文件
import configuration from '../../../../widget/tools/main'
// JSON编辑器
import JsonEditor from '../../../../components/json-editor'
import {
  concatFile,
  deleteModele,
  getAllModelGroup,
  importModel,
  upload5M,
  uploadMore5M
} from '../../../../service/modelSource'
import { getAllScreen } from '../../../../service/three'
import { uploadPic } from '../../../../service/user'
// 微件配置文件
const { widgetTypesConfiguration, widgetConfiguration, baseConfiguration } =
  configuration

const { TextArea } = Input
const { TabPane } = Tabs
const { Option } = Select
const { Panel } = Collapse
const bmf = new BMF() // 计算 MD5

interface IDesignBodyRightProps {
  screen: IScreen
  modifyScreen: (datas: IScreen) => void
  currentWidgetId: string
  currentWidget: IWidget
  modifyLargeScreenElement: (id: string, groupId: string, data: IWidget) => void
  currentPage: IPage
  setRightFlag: React.Dispatch<React.SetStateAction<boolean>>
  rightFlag: Boolean
  currentWidgetGroupId: string
  showOrHideLargeScreenElement: (id: string, groupId?: string) => void
  changeLargeScreenElement: (id: string, groupId?: string) => void
  userinfo: IAnyObject
}

interface SketchPickerProps {
  onSelect: any
  color: string
  opacity: number
}

const rgbToRgba = (rgb: string, a = 1) =>
  rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`)

const WrappedSketchPicker: FC<SketchPickerProps> = ({ onSelect, ...rest }) => {
  return (
    <SketchPicker
      {...rest}
      color={rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb
        onSelect(`rgb(${r}, ${g}, ${b})`, a)
      }}
    />
  )
}

const DesignBodyRight: FC<IDesignBodyRightProps> = ({
  screen,
  modifyScreen,
  currentWidgetId,
  currentWidget,
  modifyLargeScreenElement,
  currentPage,
  setRightFlag,
  rightFlag,
  currentWidgetGroupId,
  showOrHideLargeScreenElement,
  changeLargeScreenElement,
  userinfo
}) => {
  const [key, setKey] = useState('1')
  // 配置from
  const [configureForm] = Form.useForm()
  // 页面from
  const [pageForm] = Form.useForm()
  // 坐标from
  const [dynamicForm] = Form.useForm()
  // 数据
  const [dataForm] = Form.useForm()
  // 联动
  const [linkageForm] = Form.useForm()
  // 数据源弹窗状态
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // 模型数据源弹窗状态
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false)
  // 模型导入弹窗
  const [isModalOpen3, setIsModalOpen3] = useState<boolean>(false)
  // 大屏跳转点弹窗
  const [isModalOpen4, setIsModalOpen4] = useState<boolean>(false)
  // tab actived key
  const [tabActivedKey, setTabActivedKey] = useState<string>('1')

  const [dataSource, setDataSource] = useState([])
  const [dataSource2, setDataSource2] = useState([])

  const [form] = Form.useForm()
  const [mtlMd5, setMtlMd5] = useState<string>('')
  const [objMd5, setObjMd5] = useState<string>('')
  const [objProgress, setObjProgress] = useState<number>(0)
  const [picMd5List, setPicMd5List] = useState<string[]>([])

  const location = useLocation()
  const urlSearch: any = new URLSearchParams(location.search)

  const [selectedItems, setSelectedItems] = useState<any>([])

  useEffect(() => {
    getAllModelGroup().then((res: any) => {
      if (res.code === 200) {
        setDataSource(res.data)
      }
    })
  }, [])

  const mtlProps: UploadProps = {
    maxCount: 1,
    accept: '.mtl',
    beforeUpload(files: File) {
      bmf.md5(files, (err: any, soucrceMd5: string) => {
        setMtlMd5(soucrceMd5)
        upload5M({
          fileName: files.name,
          md5: soucrceMd5
        }).then((res: any) => {
          if (res.code === 200) {
            if (res.data.success === 1 || res.data.success === 2) {
              // 此文件已经上传过无需再次上传
              message.success('MTL文件上传成功')
            } else {
              const url: string = res.data
              fetch(url, {
                method: 'PUT',
                body: files
              })
                .then((response) => response.text())
                .then(() => {
                  message.success('MTL文件上传成功')
                })
                .catch(() => {
                  message.error('上传失败')
                })
            }
          }
        })
      })
      return false
    }
  }

  const picProps: UploadProps = {
    accept: 'image/*',
    beforeUpload(files: File) {
      bmf.md5(files, (err: any, soucrceMd5: string) => {
        const temp: any = picMd5List
        temp.push(soucrceMd5)
        setPicMd5List(temp)
        upload5M({
          fileName: files.name,
          md5: soucrceMd5
        }).then((res: any) => {
          if (res.code === 200) {
            if (res.data.success === 1 || res.data.success === 2) {
              // 此文件已经上传过无需再次上传
              message.success('贴图上传成功')
            } else {
              const url: string = res.data
              fetch(url, {
                method: 'PUT',
                body: files
              })
                .then((response) => response.text())
                .then(() => {
                  message.success('贴图上传成功')
                })
                .catch(() => {
                  message.error('上传失败')
                })
            }
          }
        })
      })
      return false
    }
  }

  // 上传切片
  const uploadChipFile = (fileObj: any, name: string) => {
    const checkUrlList = fileObj.checkUrlList
    let flag: number = 0
    checkUrlList.forEach((item: { file: string | Blob; updateUrl: any }) => {
      fetch(item.updateUrl, {
        method: 'PUT',
        body: item.file
      })
        .then((response) => response.text())
        .then(() => {
          flag++
          setObjProgress(50 + Math.ceil(flag / 60))
          if (flag === checkUrlList.length) {
            console.log('所有切片文件上传完毕!!!')
            concatFile({
              checkSize: fileObj.checkSize,
              md5: fileObj.md5,
              fileName: name
            }).then((res) => {
              setObjProgress(100)
              message.success('OBJ文件上传成功')
              console.log(res, '切片文件合并完毕！')
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    })
  }

  // 设置每一个切片文件上传的地址
  const setFilePath = (
    chunkList: { chunk: any }[],
    result: any,
    files: File
  ) => {
    // console.log(chunkList);
    // console.log(result);
    const temp = result
    chunkList.forEach((item, index) => {
      const No = temp.checkUrlList[index]?.updateUrl
        .split('.chunk?')[0]
        .split('/')
        .slice(-1)[0]
      if (index === parseInt(No)) {
        temp.checkUrlList[index].file = item.chunk
      }
    })
    setObjProgress(50)
    uploadChipFile(temp, files.name)
  }

  const objProps: UploadProps = {
    maxCount: 1,
    accept: '.obj',
    beforeUpload(files: File) {
      setObjProgress(20)
      bmf.md5(files, (err: any, soucrceMd5: string) => {
        setObjMd5(soucrceMd5)
        setObjProgress(40)
        if (files.size <= 50 * 1024 * 1024) {
          // 文件小于等于50Mb
          upload5M({
            fileName: files.name,
            md5: soucrceMd5
          }).then((res: any) => {
            if (res.code === 200) {
              if (res.data.success === 1 || res.data.success === 2) {
                // 此文件已经上传过无需再次上传
                message.success('OBJ文件上传成功')
                setObjProgress(100)
              } else {
                const url: string = res.data
                fetch(url, {
                  method: 'PUT',
                  body: files
                })
                  .then((response) => response.text())
                  .then(() => {
                    setObjProgress(100)
                    message.success('OBJ文件上传成功')
                  })
                  .catch(() => {
                    message.error('上传失败')
                  })
              }
            }
          })
        } else {
          // 文件大于50Mb，切片后上传
          const fileChunkList = splitFile(files)
          uploadMore5M({
            checkSize: fileChunkList.length,
            fileName: files.name,
            md5: soucrceMd5
          }).then((res: any) => {
            if (res.code === 200) {
              if (res.data.success === 1 || res.data.success === 2) {
                // 此文件已经上传过无需再次上传
                message.success('OBJ文件上传成功')
                setObjProgress(100)
              } else {
                setFilePath(fileChunkList, res.data, files)
              }
            }
          })
        }
      })
      return false
    }
  }

  const handleCancel = () => {
    setIsModalOpen3(false)
    setIsModalOpen2(true)
  }

  const onFinish = () => {
    form.validateFields().then((res) => {
      console.log(mtlMd5)
      console.log(picMd5List)
      console.log(objMd5)
      console.log(res)
      res.mtl = mtlMd5
      res.picList = picMd5List
      res.obj = objMd5
      importModel(res).then((ress: any) => {
        if (ress.code === 200) {
          form.resetFields()
          message.success('导入成功')
          setObjProgress(0)
          setIsModalOpen3(false)
          setIsModalOpen2(true)
          getAllModelGroup().then((resss: any) => {
            if (resss.code === 200) {
              setDataSource(resss.data)
            }
          })
        }
      })
    })
  }

  const columns: any = [
    {
      title: '模型名称',
      dataIndex: 'groupName',
      width: 300
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_: any, record: any) => [
        <Button
          key='delete'
          type='text'
          danger
          onClick={(e) => {
            deleteModele(record).then((res: any) => {
              if (res.code === 200) {
                message.success('删除成功')
                getAllModelGroup().then((ress: any) => {
                  if (ress.code === 200) {
                    setDataSource(ress.data)
                  }
                })
              }
            })
          }}>
          删除
        </Button>,
        <Button
          disabled={
            screen.threeModelSource === '/bigscreen/modelGroup/model/' + record.id
          }
          style={{ marginLeft: '10px' }}
          key='copy'
          type='link'
          onClick={() => {
            pageForm.setFieldValue(
              'threeModelSource',
              '/bigscreen/modelGroup/model/' + record.id
            )
            const temp = screen
            temp.threeModelSource = '/bigscreen/modelGroup/model/' + record.id
            modifyScreen(temp)
            message.success('设置成功')
            setIsModalOpen2(false)
            setIsModalOpen3(false)
          }}>
          {screen.threeModelSource === '/bigscreen/modelGroup/model/' + record.id
            ? '当前设置'
            : '设置数据源'}
        </Button>
      ]
    }
  ]

  const columns2: any = [
    {
      title: '单位名称',
      dataIndex: 'unitName',
      width: 200
    },
    {
      title: '单位ID',
      dataIndex: 'agencyId',
      width: 200
    },
    {
      title: '屏幕名称',
      dataIndex: 'title',
      width: 200
    },
    {
      title: 'X坐标',
      dataIndex: 'X',
      width: 200,
      render: (_: any, record: any) => (
        <InputNumber
          style={{ width: '200px' }}
          onChange={(val) => {
            record.X = val
            const temp: any = selectedRowValues
            temp.forEach((item: { id: number; X: number }) => {
              if (item.id === record.id) {
                item.X = val
              }
            })
          }}
          defaultValue={record.X ?? null}
        />
      )
    },
    {
      title: 'Y坐标',
      dataIndex: 'Y',
      width: 200,
      render: (_: any, record: any) => (
        <InputNumber
          style={{ width: '200px' }}
          onChange={(val) => {
            record.Y = val
            const temp: any = selectedRowValues
            temp.forEach((item: { id: number; Y: number }) => {
              if (item.id === record.id) {
                item.Y = val
              }
            })
          }}
          defaultValue={record.Y ?? null}
        />
      )
    },
    {
      title: 'Z坐标',
      dataIndex: 'Z',
      width: 200,
      render: (_: any, record: any) => (
        <InputNumber
          style={{ width: '200px' }}
          onChange={(val) => {
            record.Z = val
            const temp: any = selectedRowValues
            temp.forEach((item: { id: number; Z: number }) => {
              if (item.id === record.id) {
                item.Z = val
              }
            })
          }}
          defaultValue={record.Z ?? null}
        />
      )
    }
  ]

  // 图片组件数据上传
  const fileProp: any = {
    maxCount: 1,
    multiple: false,
    accept: 'image/*',
    beforeUpload(files: File) {
      // const reader = new FileReader()
      // reader.readAsDataURL(files)
      // reader.onload = (e) => {
      //   dataForm.setFieldValue('mock', {
      //     data: e?.target?.result
      //   })
      // }
      uploadPic(
        getFormData({
          file: files
        })
      ).then((res) => {
        if (currentWidget.code === 'widgetTurnImage') {
          // 轮播
          dataForm.setFieldValue('mock', {
            data: [
              ...(dataForm.getFieldValue('mock')[
                dataForm.getFieldValue('field')
              ] ?? []),
              {
                url: res.data.url,
                ad: ''
              }
            ]
          })
        } else {
          dataForm.setFieldValue('mock', {
            [dataForm.getFieldValue('field')]: res.data.url
          })
        }
      })

      return false
    }
  }

  // 屏幕配置背景图片上传
  const fileProp2: any = {
    maxCount: 1,
    multiple: false,
    beforeUpload(files: File) {
      uploadPic(
        getFormData({
          file: files
        })
      ).then((res) => {
        pageForm.setFieldValue('backgroundImage', res.data.url)
        const temp = screen
        temp.backgroundImage = res.data.url
        modifyScreen(temp)
      })
      return false
    }
  }

  // 地图贴图上传
  const fileProp3: any = {
    maxCount: 1,
    multiple: false,
    beforeUpload(files: File) {
      uploadPic(
        getFormData({
          file: files
        })
      ).then((res) => {
        pageForm.setFieldValue('chartlet', res.data.url)
        const temp = screen
        temp.chartlet = res.data.url
        modifyScreen(temp)
      })
      return false
    }
  }

  // SVG转base64
  const fileProp4: any = {
    maxCount: 1,
    multiple: false,
    accept: 'image/svg+xml',
    beforeUpload(files: File) {
      const reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onload = (e) => {
        const newCurrentWidget = JSON.parse(JSON.stringify(currentWidget))
        newCurrentWidget.configureValue.svgAddress = e?.target?.result
        modifyLargeScreenElement(
          currentWidgetId,
          currentWidgetGroupId,
          newCurrentWidget
        )
      }
      return false
    }
  }

  useEffect(() => {
    if (currentWidget.configureValue) {
      configureForm.setFieldsValue(currentWidget.configureValue)
    }
    if (currentWidget.coordinateValue) {
      dynamicForm.setFieldsValue(currentWidget.coordinateValue)
    }
    if (currentWidget.dataValue) {
      dataForm.setFieldsValue(currentWidget.dataValue)
    }
    if (currentWidget.linkageIds) {
      linkageForm.setFieldsValue({
        linkageIds: currentWidget.linkageIds.split(',')
      })
    }
  }, [configureForm, currentWidget, dataForm, dynamicForm, linkageForm])
  // }, [currentWidget])
  // 判断数据是Array 或者 object
  const judgeType = (data: any, type: string) => {
    return Object.prototype.toString.call(data) == type
  }

  /**
   *
   * @param callback 返回的方法
   * @param name 表单名
   * @param value 表单值
   * @param field 字段名
   */
  const onChangeHandler = (
    callback: Function,
    name: string,
    value: any,
    field: string
  ) => {
    if (!field) {
      callback &&
        // eslint-disable-next-line callback-return
        callback({
          [name]: value
        })
    } else {
      const newCurrentWidget = JSON.parse(JSON.stringify(currentWidget))
      newCurrentWidget[field][name] = value
      callback &&
        // eslint-disable-next-line callback-return
        callback(currentWidgetId, currentWidgetGroupId, newCurrentWidget)
    }
  }

  /**
   * 基础表单
   * @param item 单个配置项
   * @param form 表单实例
   * @param callback 返回方法
   * @param field 字段名
   * @param isUpdate 是否change更新
   * @returns
   */
  const baseForm = (
    item: any,
    form: FormInstance<any>,
    callback: Function,
    field: string,
    isUpdate: boolean = true
  ) => {
    return (
      <>
        {item.componentName === 'Input' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Input
              allowClear
              disabled={item.disabled}
              onBlur={(e) =>
                isUpdate &&
                onChangeHandler(callback, item.name, e.target.value, field)
              }
              placeholder={item.placeholder}
            />
          </Form.Item>
        )}
        {item.componentName === 'InputNumber' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <InputNumber
              disabled={item.disabled}
              min={item.min}
              max={item.max}
              onBlur={(e) =>
                isUpdate &&
                onChangeHandler(
                  callback,
                  item.name,
                  e.target.value ? Number(e.target.value) : 0,
                  field
                )
              }
              style={{ width: '100%' }}
              placeholder={item.placeholder}
            />
          </Form.Item>
        )}
        {item.componentName === 'SetScreenWH' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Button
              type='primary'
              onClick={() => {
                // alert(
                //   `可视区域宽度：${document.body.clientWidth}；可视区域高度：${document.body.clientHeight}`
                // )
                pageForm.setFieldValue('width', document.body.clientWidth)
                pageForm.setFieldValue('height', document.body.clientHeight)
                const temp = screen
                temp.width = document.body.clientWidth
                temp.height = document.body.clientHeight
                modifyScreen(temp)
                message.success('设置成功')
              }}>
              获取
            </Button>
          </Form.Item>
        )}
        {item.componentName === 'TextArea' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <TextArea
              allowClear
              disabled={item.disabled}
              onBlur={(e) =>
                isUpdate &&
                onChangeHandler(callback, item.name, e.target.value, field)
              }
              rows={8}
              placeholder={item.placeholder}
            />
          </Form.Item>
        )}
        {item.componentName === 'Switch' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            valuePropName='checked'
            rules={[{ required: item.required }]}>
            <Switch
              disabled={
                item.disabled ||
                (item.name === 'useInterface' && !currentWidgetGroupId)
              }
              onChange={(value) =>
                isUpdate && onChangeHandler(callback, item.name, value, field)
              }
            />
          </Form.Item>
        )}
        {item.componentName === 'Slider' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Slider
              min={item.min || 0}
              max={item.max || 100}
              disabled={item.disabled}
              step={item.step || 1}
              onAfterChange={(value) =>
                isUpdate && onChangeHandler(callback, item.name, value, field)
              }
            />
          </Form.Item>
        )}
        {item.componentName === 'Select' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Select
              allowClear
              disabled={item.disabled}
              onChange={(value: string) =>
                isUpdate && onChangeHandler(callback, item.name, value, field)
              }
              placeholder={item.placeholder}>
              {item.options.map((item: any) => (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {item.componentName === 'SketchPicker' && (
          <Form.Item label={item.label}>
            <Row>
              <Col span={12}>
                <Form.Item
                  noStyle
                  name={item.name}
                  tooltip={item.tooltip}
                  rules={[{ required: item.required }]}>
                  <Input
                    allowClear
                    disabled={item.disabled}
                    onBlur={(e) =>
                      isUpdate &&
                      onChangeHandler(
                        callback,
                        item.name,
                        e.target.value,
                        field
                      )
                    }
                    placeholder={item.placeholder}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item shouldUpdate noStyle>
                  {() => (
                    <div
                      className='color-wrapper'
                      style={{
                        background: form.getFieldValue(item.name),
                        width: '100%'
                      }}>
                      获取颜色
                      <div className='color'>
                        <ChromePicker
                          color={form.getFieldValue(item.name)}
                          onChangeComplete={(e) => {
                            form.setFieldsValue({
                              [item.name]: `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`
                            })
                            isUpdate
                              ? onChangeHandler(
                                  callback,
                                  item.name,
                                  `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`,
                                  field
                                )
                              : form.setFieldValue(
                                  item.name,
                                  `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`
                                )
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}
        {item.componentName === 'JsonEdit' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Form.Item shouldUpdate noStyle>
              <JsonEditor
                options={{ name: currentWidget.id }}
                value={{
                  [currentWidget.dataValue.field]: form.getFieldValue(
                    item.name
                  )[currentWidget.dataValue.field]
                }}
                onChange={(e) =>
                  isUpdate
                    ? onChangeHandler(callback, item.name, e, field)
                    : form.setFieldValue(item.name, e)
                }
              />
            </Form.Item>
          </Form.Item>
        )}
        {item.componentName === 'JsonEdit2' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Form.Item shouldUpdate noStyle>
              <JsonEditor
                value={currentWidget.dataValue.params}
                onChange={(e) =>
                  isUpdate
                    ? onChangeHandler(callback, item.name, e, field)
                    : form.setFieldValue(item.name, e)
                }
              />
            </Form.Item>
          </Form.Item>
        )}
        {item.componentName === 'LinearColorPicker' && (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}>
            <Form.Item shouldUpdate noStyle>
              <GradientPicker
                {...{
                  width: 270,
                  paletteHeight: 32,
                  palette: form.getFieldValue(item.name),
                  onPaletteChange: (e: Event) => {
                    isUpdate
                      ? onChangeHandler(callback, item.name, e, field)
                      : form.setFieldValue(item.name, e)
                  }
                }}>
                <WrappedSketchPicker
                  onSelect={undefined}
                  color={''}
                  opacity={0}
                />
              </GradientPicker>
            </Form.Item>
          </Form.Item>
        )}
        {currentWidget.type === 'image'
          ? item.componentName === 'UploadImage' && (
              <Form.Item
                label={item.label}
                name={item.name}
                tooltip={item.tooltip}
                rules={[{ required: item.required }]}
                valuePropName={item.name}>
                <Upload {...fileProp}>
                  <Button type='primary' icon={<UploadOutlined />}>
                    上传本地图片
                  </Button>
                </Upload>
              </Form.Item>
            )
          : null}
        {item.componentName === 'UploadBackgroundImage' ? (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}
            valuePropName={item.name}>
            <Upload {...fileProp2}>
              <Button type='primary' icon={<UploadOutlined />}>
                上传背景图片
              </Button>
            </Upload>
          </Form.Item>
        ) : null}

        {item.componentName === 'UploadChartletImage' ? (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}
            valuePropName={item.name}>
            <Upload {...fileProp3}>
              <Button type='primary' icon={<UploadOutlined />}>
                上传贴图
              </Button>
            </Upload>
          </Form.Item>
        ) : null}

        {item.componentName === 'ModelSet' ? (
          <Form.Item>
            <Button type='primary' onClick={() => setIsModalOpen2(true)}>
              设置模型数据
            </Button>
          </Form.Item>
        ) : null}

        {item.componentName === 'SetMapArea' ? (
          <Form.Item label={item.label} name={item.name}>
            <Area screen={screen} modifyScreen={modifyScreen} />
          </Form.Item>
        ) : null}

        {item.componentName === 'SetPoint' ? (
          <Form.Item label={item.label}>
            <Button
              type='primary'
              onClick={() => {
                getAllScreen().then((res: any) => {
                  if (res.code === 200) {
                    const temp: any = [
                      {
                        unitName: res.data.unitName,
                        bigScreenViewDTOList: res.data.bigScreenViewDTOList.map(
                          (i: {
                            screen: {
                              id: number
                              title: string
                              agencyId: number
                            }
                          }) => {
                            return {
                              id: i.screen.id,
                              title: i.screen.title,
                              agencyId: i.screen.agencyId
                            }
                          }
                        )
                      },
                      ...(res.data.bigScreenJoinVOList || [])
                    ]
                      .map((item) =>
                        item.bigScreenViewDTOList.map(
                          (j: {
                            id: number
                            title: string
                            screen: any
                            agencyId: number
                          }) => {
                            return {
                              unitName: item.unitName,
                              id: j.id || j.screen.id,
                              title: j.title || j.screen.title,
                              agencyId: j.agencyId || j.screen.agencyId
                            }
                          }
                        )
                      )
                      .filter((subArr) => subArr.length > 0)
                      .flat()
                      .filter(
                        (subItem) =>
                          subItem.id !== parseFloat(urlSearch.get('id'))
                      )
                    if (screen.axisList) {
                      const tempAxisList: any = screen.axisList
                      setSelectedRowKeys(
                        JSON.parse(tempAxisList).map(
                          (i: { id: number }) => i.id
                        )
                      )
                      setSelectedRowValues(JSON.parse(tempAxisList))
                      const mergedArray = JSON.parse(tempAxisList).concat(temp)
                      const distinctArray = mergedArray.reduce(
                        (result: any[], obj: { id: any }) => {
                          if (!result.some((item) => item.id === obj.id)) {
                            result.push(obj)
                          }
                          return result
                        },
                        []
                      )
                      setDataSource2(distinctArray)
                    } else {
                      setDataSource2(temp)
                    }
                    setIsModalOpen4(true)
                  }
                })
              }}>
              设置
            </Button>
          </Form.Item>
        ) : null}

        {item.componentName === 'TurnScreen' ? (
          <Form.Item label={item.label} tooltip={item.tooltip}>
            <Turn screen={screen} modifyScreen={modifyScreen} />
          </Form.Item>
        ) : null}

        {item.componentName === 'UploadSvg' ? (
          <Form.Item
            label={item.label}
            name={item.name}
            tooltip={item.tooltip}
            rules={[{ required: item.required }]}
            valuePropName={item.name}>
            <Upload {...fileProp4}>
              <Button type='primary' icon={<UploadOutlined />}>
                点击上传SVG
              </Button>
            </Upload>
          </Form.Item>
        ) : null}
      </>
    )
  }

  /**
   * 动态渲染表单
   * @param datas 数据
   * @param form 表单实例
   * @param callback 返回函数
   * @param field 字段名
   * @param isUpdate 是否change更新
   * @returns
   */
  const renderDynamicForm = (
    datas: any,
    form: FormInstance<any>,
    callback: Function,
    field: string,
    isUpdate: boolean = true
  ) => {
    // eslint-disable-next-line array-callback-return
    return datas.map((item: any, index: number) => {
      if (judgeType(item, '[object Object]')) {
        const relationFields =
          item.relationFields !== undefined
            ? item.relationFields.split(',')
            : []
        return (
          <div key={index}>
            {!relationFields.length ? (
              baseForm(item, form, callback, field, isUpdate)
            ) : (
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  if (
                    relationFields.every((subItem: string) =>
                      item.relationValues.includes(
                        String(getFieldValue(subItem)) || null
                      )
                    )
                  ) {
                    return baseForm(item, form, callback, field, isUpdate)
                  }
                }}
              </Form.Item>
            )}
          </div>
        )
      }
      if (judgeType(item, '[object Array]')) {
        return (
          <div key={index}>
            {item.map((subItem: any, subIndex: number) => {
              const relationFields =
                subItem.relationFields !== undefined
                  ? subItem.relationFields.split(',')
                  : []
              return (
                <Collapse key={subIndex}>
                  {subItem.relationFields === undefined ? (
                    <Panel header={subItem.name} key={subItem + subIndex}>
                      {renderDynamicForm(
                        subItem.list,
                        form,
                        callback,
                        field,
                        isUpdate
                      )}
                    </Panel>
                  ) : (
                    <Form.Item noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        if (
                          relationFields.every((subbItem: string) =>
                            subItem.relationValues.includes(
                              String(getFieldValue(subbItem)) || null
                            )
                          )
                        ) {
                          return (
                            <Collapse key={subIndex}>
                              <Panel
                                header={subItem.name}
                                key={subItem + subIndex}>
                                {renderDynamicForm(
                                  subItem.list,
                                  form,
                                  callback,
                                  field,
                                  isUpdate
                                )}
                              </Panel>
                            </Collapse>
                          )
                        }
                      }}
                    </Form.Item>
                  )}
                </Collapse>
              )
            })}
          </div>
        )
      }
    })
  }

  // 保存数据
  const saveData = (values: any) => {
    const newCurrentWidget = JSON.parse(JSON.stringify(currentWidget))
    newCurrentWidget.dataValue = values
    // 如果没有说明该组件有问题
    if (!widgetConfiguration[newCurrentWidget.code]) {
      return
    }
    newCurrentWidget.dataValue = {
      ...widgetConfiguration[newCurrentWidget.code].dataValue,
      ...values
    }
    modifyLargeScreenElement(
      currentWidgetId,
      currentWidgetGroupId,
      newCurrentWidget
    )
  }

  // 切换元素
  const changeElement = (e: MouseEvent, id: string, groupId?: string) => {
    e.stopPropagation()
    e.preventDefault()
    document
      .querySelector('#js-content-menu')
      ?.setAttribute('style', 'display: none')
    if (id !== currentWidgetId) {
      changeLargeScreenElement(id, groupId)
    }
  }

  // 修改元素
  const modifyElement = (e: MouseEvent, id: string, groupId?: string) => {
    e.stopPropagation()
    e.preventDefault()
    showOrHideLargeScreenElement(id, groupId)
  }

  // 组件树
  const renderWidgetsTree = (datas: IWidget[], groudId?: string) => {
    return datas.map((item) => {
      if (item.widgets) {
        return (
          <div className='app-screen-disign__layer' key={item.id}>
            <div
              onContextMenu={(e) => {
                changeElement(e, item.id, item.id)
                contentMenuHandler(e)
              }}
              onClick={(e) => changeElement(e, item.id, item.id)}
              className={`header ${
                item.id === currentWidgetId ? 'is-active' : ''
              }`}>
              <span onClick={(e) => modifyElement(e, item.id)} className='show'>
                {item.configureValue.styleDisplay === 'block' ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
              <span className='file'>
                <FolderOpenOutlined />
              </span>
              <span className='label'>{item.label}</span>
            </div>
            {renderWidgetsTree(item.widgets, item.id)}
          </div>
        )
      } else {
        return (
          <div key={item.id} className='app-screen-disign__layer--item'>
            <div
              onContextMenu={(e) => {
                changeElement(e, item.id, groudId)
                contentMenuHandler(e)
              }}
              onClick={(e) => {
                if (item.id !== currentWidgetId) {
                  if (e.ctrlKey && !groudId) {
                    changeLargeScreenElement(
                      currentWidgetId
                        ? `${currentWidgetId},${item.id}`
                        : item.id
                    )
                    // if (selectedItems.includes(item.id)) {
                    //   setSelectedItems(
                    //     selectedItems.filter((id: string) => id !== item.id)
                    //   )
                    // } else {
                    //   setSelectedItems([...selectedItems, item.id])
                    // }
                  } else {
                    // setSelectedItems([item.id])
                    changeElement(e, item.id, groudId)
                  }
                }
              }}
              className={`header ${
                item.id === currentWidgetId ? 'is-active' : ''
              }`}>
              <span
                onClick={(e) => modifyElement(e, item.id, groudId)}
                className='show'>
                {item.configureValue.styleDisplay === 'block' ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
              <span className='file'>
                <FolderOutlined />
              </span>
              <span className='label'>{item.label}</span>
            </div>
          </div>
        )
      }
    })
  }

  // 获取接口字段数据
  const getParamsData: any[] = useMemo(() => {
    let result: any[] = []
    if (currentWidgetGroupId) {
      const index = currentPage.widgets.findIndex(
        (item) => item.id === currentWidgetGroupId
      )
      if (
        index !== -1 &&
        currentPage.widgets[index].dataValue &&
        currentPage.widgets[index].dataValue.params
      ) {
        for (let field in currentPage.widgets[index].dataValue.params) {
          result.push(field)
        }
      }
    }
    return result
  }, [currentWidgetGroupId, currentPage])

  useEffect(() => {
    if (currentWidgetId) {
      // setKey('1')
      setKey(tabActivedKey)
    } else {
      setKey('2')
      setTabActivedKey('2')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWidgetId])

  // 判断是否显示联动组件
  const isShowLinkageForm = useMemo(() => {
    let flag = false

    if (!currentPage.widgets) {
      return flag
    }

    if (currentWidgetId === currentWidgetGroupId) {
      const index = currentPage.widgets.findIndex(
        (item) => item.id === currentWidgetGroupId
      )
      if (
        index !== -1 &&
        currentPage.widgets[index].widgets.some((item) => item.type === 'form')
      ) {
        return true
      }
    }

    return flag
  }, [currentPage, currentWidgetId, currentWidgetGroupId])

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]) // 跳转屏幕点
  const [selectedRowValues, setSelectedRowValues] = useState<any[]>([]) // 跳转屏幕点

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(keys)
      setSelectedRowValues(selectedRows)
    }
  }

  const handleOkSet = () => {
    const temp: any = screen
    temp.axisList = JSON.stringify(selectedRowValues)
    modifyScreen(temp)
    setIsModalOpen4(false)
    setSelectedRowKeys([])
    setSelectedRowValues([])
  }

  return (
    <>
      <div
        className='app-screen-disign__body--right'
        style={{
          right: rightFlag ? 0 : -400
        }}>
        <div onClick={() => setRightFlag(!rightFlag)} className='operation'>
          {rightFlag ? <LeftOutlined /> : <RightOutlined />}
        </div>
        <Tabs
          className='custom-tabs'
          activeKey={key}
          onChange={(key) => {
            setKey(key)
            setTabActivedKey(key)
          }}
          destroyInactiveTabPane>
          {currentPage && currentPage.widgets && currentPage.widgets.length ? (
            <TabPane tab='图层管理' key='1' style={{ position: 'relative' }}>
              <div className='app-screen-disign__layer'>
                {renderWidgetsTree(currentPage.widgets || [])}
              </div>
            </TabPane>
          ) : null}

          <TabPane tab='屏幕配置' key='2'>
            <Form
              preserve
              form={pageForm}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              autoComplete='off'
              labelAlign='left'
              initialValues={screen}
              // onValuesChange={(changedValues, allValues) => modifyScreen(allValues)}
            >
              {renderDynamicForm(
                baseConfiguration.page.configure || [],
                pageForm,
                modifyScreen,
                ''
              )}
            </Form>
          </TabPane>
          {currentWidgetId && !currentWidgetId.includes(',') && (
            <>
              <TabPane tab='组件配置' key='3'>
                <Form
                  form={configureForm}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  autoComplete='off'
                  labelAlign='left'
                  initialValues={currentWidget.dataValue?.initData ?? {}}>
                  {widgetTypesConfiguration[currentWidget.code]
                    ? renderDynamicForm(
                        widgetTypesConfiguration[currentWidget.code]
                          .configure || [],
                        configureForm,
                        modifyLargeScreenElement,
                        'configureValue',
                        true
                      )
                    : widgetTypesConfiguration[currentWidget.type]
                    ? renderDynamicForm(
                        widgetTypesConfiguration[currentWidget.type]
                          .configure || [],
                        configureForm,
                        modifyLargeScreenElement,
                        'configureValue',
                        true
                      )
                    : null}
                </Form>
              </TabPane>
              {/* 判断是否显示数据选项卡 */}
              {(widgetTypesConfiguration[currentWidget.code] &&
                widgetTypesConfiguration[currentWidget.code].data) ||
              (widgetTypesConfiguration[currentWidget.type] &&
                widgetTypesConfiguration[currentWidget.type].data) ? (
                <TabPane tab='数据' key='4'>
                  <Form
                    preserve
                    form={dataForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete='off'
                    labelAlign='left'
                    onFinish={saveData}>
                    {widgetTypesConfiguration[currentWidget.code]
                      ? renderDynamicForm(
                          widgetTypesConfiguration[currentWidget.code].data ||
                            [],
                          dataForm,
                          modifyLargeScreenElement,
                          'dataValue',
                          false
                        )
                      : widgetTypesConfiguration[currentWidget.type]
                      ? renderDynamicForm(
                          widgetTypesConfiguration[currentWidget.type].data ||
                            [],
                          dataForm,
                          modifyLargeScreenElement,
                          'dataValue',
                          false
                        )
                      : null}
                    {currentWidget.type === 'form' ? (
                      <Form.Item
                        label='接口字段'
                        name='paramName'
                        tooltip='从组组件的参数中选择'>
                        <Select placeholder='请选择'>
                          {getParamsData.map((item) => (
                            <Option key={item}>{item}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : null}
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                      <Button type='primary' htmlType='submit' block>
                        保存
                      </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                      <Button
                        type='primary'
                        block
                        onClick={() => setIsModalOpen(true)}>
                        数据源
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              ) : null}
              <TabPane tab='坐标' key='5'>
                <Form
                  preserve
                  form={dynamicForm}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  autoComplete='off'
                  labelAlign='left'>
                  {renderDynamicForm(
                    baseConfiguration.coordinate.configure || [],
                    dynamicForm,
                    modifyLargeScreenElement,
                    'coordinateValue',
                    true
                  )}
                </Form>
              </TabPane>
            </>
          )}
          {isShowLinkageForm ? (
            <TabPane tab='联动' key='6'>
              <Form
                form={linkageForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete='off'
                labelAlign='left'>
                <Form.Item label='联动组件' name='linkageIds'>
                  <Select
                    onChange={(e: any) =>
                      modifyLargeScreenElement(
                        currentWidgetId,
                        currentWidgetGroupId,
                        {
                          ...currentWidget,
                          linkageIds: e.join(',')
                        }
                      )
                    }
                    mode='multiple'
                    placeholder='请选择联动组件'>
                    {currentPage && currentPage.widgets
                      ? // eslint-disable-next-line array-callback-return
                        currentPage.widgets.map((item) => {
                          if (item.id !== currentWidgetGroupId) {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.label}
                              </Option>
                            )
                          }
                        })
                      : null}
                  </Select>
                </Form.Item>
              </Form>
            </TabPane>
          ) : null}
        </Tabs>
      </div>
      <Modal
        wrapClassName='modal-data'
        width='80%'
        title='数据源'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}>
        <DataSourceSet userinfo={userinfo} />
      </Modal>
      <Modal
        wrapClassName='modal-data'
        footer={null}
        width='80%'
        title='模型数据源'
        open={isModalOpen2}
        onOk={() => setIsModalOpen2(false)}
        onCancel={() => setIsModalOpen2(false)}>
        <Button
          type='primary'
          style={{ marginBottom: '10px' }}
          onClick={() => {
            setIsModalOpen2(false)
            setIsModalOpen3(true)
          }}>
          导入模型
        </Button>
        <div className='container'>
          <Table
            size='small'
            rowKey={(record: { id: number }) => record.id}
            dataSource={dataSource}
            columns={columns}
            rowClassName='model-row'
          />
        </div>
      </Modal>
      <Modal
        wrapClassName='paramModal'
        title='导入模型'
        okText='导入'
        closable={false}
        open={isModalOpen3}
        onCancel={handleCancel}
        onOk={onFinish}
        maskClosable={false}>
        <Form form={form} name='modelForm' layout='vertical'>
          <Form.Item
            label='模型名称'
            name='modelName'
            rules={[{ required: true, message: '此项为必填项!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='MTL'
            name='mtl'
            valuePropName='mtl'
            rules={[{ required: true, message: '此项为必填项!' }]}>
            <Upload {...mtlProps}>
              <Button style={{ width: '260px' }} icon={<UploadOutlined />}>
                上传文件
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='OBJ'
            name='obj'
            valuePropName='obj'
            rules={[{ required: true, message: '此项为必填项!' }]}
            extra={<Progress percent={objProgress} status='active' />}>
            <Upload {...objProps}>
              <Button style={{ width: '260px' }} icon={<UploadOutlined />}>
                上传文件
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label='贴图' name='picList' valuePropName='picList'>
            <Upload {...picProps}>
              <Button style={{ width: '260px' }} icon={<UploadOutlined />}>
                上传文件
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        wrapClassName='modal-data'
        title='设置（生效条件：勾选且设置坐标）取消选中并执行保存后取消选中行的坐标需重新设置'
        closable={false}
        open={isModalOpen4}
        onCancel={() => {
          setIsModalOpen4(false)
          setSelectedRowKeys([])
          setSelectedRowValues([])
        }}
        onOk={handleOkSet}
        maskClosable={false}
        width='80%'>
        <div className='container'>
          <Table
            size='small'
            rowKey={(record: { id: number }) => record.id}
            dataSource={dataSource2}
            columns={columns2}
            rowClassName='model-row'
            pagination={false}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default DesignBodyRight
