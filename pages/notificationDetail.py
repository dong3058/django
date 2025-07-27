from django.http import JsonResponse
from django.shortcuts import render
from.models import NotificationFile
from django.http import FileResponse
import os
def index(request,file_id):
    file=NotificationFile.objects.get(id=file_id)
    if(file.document):
        print("file:{}-{}-{}".format(file.title,file.content,file.pub_date))
        return render(request,'notifyDetail.html',{
            'title':file.title,
            'content':file.content,
            'createDate':file.pub_date,
            'fileExist':True,
            'downUrl': '/pages/get/file/{}'.format(file_id)})

    print("없어서 호출됨")
    return render(request, 'notifyDetail.html', {
        'title': file.title,
        'content': file.content,
        'createDate': file.pub_date,
        'fileExist': False})


def getFile(request,file_id):

    file=NotificationFile.objects.get(id=file_id).document

    file_path = file.path
    filename = os.path.basename(file.name)
    mime_type = 'application/octet-stream'

    response = FileResponse(open(file_path, 'rb'), content_type=mime_type)
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    return response

def getPageDate(request,page_number):
    limit = 5
    base_queryset = (NotificationFile.objects
                     .values('id', 'title','pub_date')
                     .order_by("pub_date"))

    total_count = base_queryset.count()
    offset = (page_number - 1) * limit
    if offset < 0:
        offset = 0
    if offset >= total_count and total_count > 0:
        page_number = (total_count + limit - 1) // limit
        offset = (page_number - 1) * limit
        if offset < 0:
            offset = 0

    final_items_queryset = base_queryset[offset : offset + limit]
    final_items_list = list(final_items_queryset)
    return JsonResponse({
        'data': final_items_list,
        'totalCount': total_count,
        "currentPage": page_number,
        "limit": limit
    })