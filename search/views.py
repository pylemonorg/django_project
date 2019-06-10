import os
import json
import csv
from random import randint
from django.shortcuts import render
from django.views.generic import View
from django.http import *
# Create your views here.

# 读取CSV文件模版信息
csv_data = {"json_data": []}
csv_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), r'static/rule_files/all.csv')
with open(csv_file, 'r', encoding='utf-8-sig') as f:
    _csv_data = csv.DictReader(f)
    for _i in _csv_data:
        csv_data['json_data'].append(list(dict(_i).values()))


class IndexView(View):

    def get(self, request):
        # 背景图片下标
        # bg_index = randint(1, 5)
        return render(request, 'index.html')

    def post(self, request):
        request_data = dict(request.POST)
        search_msg = request_data.get('search_msg',)  # 列表[]
        search_msg = search_msg[0].strip()
        print('请求内容：', search_msg)
        if not search_msg:
            response_data = {'json_data': None}
            return HttpResponse(json.dumps(response_data))

        # print(request.text)
        # request_data = json.loads(request.body.decode())
        # request_data = request.POST()
        # print(request_data)
        # response_data = {'json_data': '123123132131'}
        # json_data = {'json_data': []}
        # for i in range(1, 30):
        #     json_data["json_data"].append(['模版1', 'qq', 'qq.com'])
        # # response_data = {'json_data': [['模版1', 'qq', 'qq.com'], ['模版2', 'taobao', 'taobao.com'], ]}
        # json_data = {'json_data': None}
        # 查找csv内容
        csv_msg = csv_data.get("json_data")
        response_data = {"json_data": []}
        for csv_li in csv_msg:
            for i in csv_li:

                if search_msg in i:
                    response_data["json_data"].append(csv_li)
                    break
                else:
                    continue
        if not response_data.get("json_data"):
            response_data = {"json_data": None}
        print('返回内容', response_data)
        return HttpResponse(json.dumps(response_data))


def ajax_index(request):
    pass
    # print('hello')
    # form = request.POST()
    # if form.is_valid():
    #     data = form.cleaned_data
    #     print(data)
    #     print('====')
    #     pk_id = request.POST
    #     print(pk_id)
    # print('POST')
    # return HttpResponse({'HELLO': 'HELLO'})
        # bool = 0
        # try:
        #     fnc_prd_id = get_object_or_404(FncPrd, pk=pk_id)
        #     bool = True
        # except Exception as e:
        #     bool = False
        # finally:
        #     msgs = {'bool': bool}
        #     return JsonResponse({'bool': bool})
            # msg = json.dumps(msgs)
            # return HttpResponse(msg)
