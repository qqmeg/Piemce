from django.http import HttpResponse

def homepage(request):
    return HttpResponse("Hello, welcome to my project!")

def about(request):
    return HttpResponse("This is the about page of my project.")
