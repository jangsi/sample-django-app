from django.urls import path

from . import views

app_name = 'survey'
urlpatterns = [
  path('', views.index, name='index'),
  path('poll/', views.poll, name='poll'),
  path('<int:question_id>/vote/', views.vote, name='vote'),
  path('<int:question_id>/results/', views.results, name='results'),
]
