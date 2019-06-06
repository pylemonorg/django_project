import json

from django.shortcuts import render
from django.views.generic import View
from django.http import *
# Create your views here.


class IndexView(View):

    def get(self, request):
        return render(request, 'index.html')

    def post(self, request):
        print(request.POST)
        request_data = dict(request.POST)
        search_msg = request_data.get('search_msg', '')
        print(search_msg)
        # print(request.text)
        # request_data = json.loads(request.body.decode())
        # request_data = request.POST()
        # print(request_data)
        # response_data = {'json_data': '123123132131'}
        response_data = {'json_data': [['模版1', 'qq', 'qq.com'], ['模版2', 'taobao', 'taobao.com'], ]}
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
