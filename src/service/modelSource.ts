/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-08-29 09:55:22
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-08-29 11:06:43
 */
import { del, get, post } from './fetch'

export async function getAllModelGroup(options?: { [key: string]: any }) {
  return get({
    url: '/bigscreen/modelGroup/',
    loading: true,
    params: options
  })
}

export async function deleteModele(options?: { [key: string]: any }) {
  return del({
    url: `/bigscreen/modelGroup/${options?.id}`,
    loading: true
  })
}

export async function upload5M(options?: { [key: string]: any }) {
  return post({
    url: '/geo/file/update',
    loading: true,
    data: options
  })
}

export async function uploadMore5M(options?: { [key: string]: any }) {
  return post({
    url: '/geo/file/',
    loading: true,
    data: options
  })
}

export async function concatFile(options?: { [key: string]: any }) {
  return post({
    url: '/geo/file/composeFile',
    loading: true,
    data: options
  })
}

export async function importModel(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/modelGroup/importModel',
    loading: true,
    data: options
  })
}