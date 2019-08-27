import json
import random

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.urls import reverse
from django.core import serializers

from .models import Question, Choice

# Create your views here.
def index(request):
  return JsonResponse({ 'greeting': 'hi' })

def poll(request):
  redeemed_questions = request.session.get('sumo_q', [])

  questions_list = get_list_or_404(Question.objects.exclude(pk__in=redeemed_questions))
  _data = [ random.choice(questions_list) ]
  question_json = json.loads(serializers.serialize('json', _data))[0]
  json_response = { **question_json.get('fields'), **{ 'pk': question_json.get('pk') } }

  choices = get_list_or_404(Choice, question=question_json.get('pk'))
  choices_json = json.loads(serializers.serialize('json', choices))
  choices_map = list(map(lambda c: { **c.get('fields'), **{ 'pk': c.get('pk') } }, choices_json))

  return JsonResponse({ 'question': json_response, 'choices': choices_map })

def vote(request, question_id):
  question = get_object_or_404(Question, pk=question_id)
  choice = json.loads(request.body)['choice']

  try:
    selected_choice = question.choice_set.get(pk=choice)
  except (KeyError, Choice.DoesNotExist):
    # Redisplay the question voting form.
    return JsonResponse({ 'success': False })
  else:
    selected_choice.votes += 1
    selected_choice.save()

    sumo_q = request.session.get('sumo_q', [])
    if (choice not in sumo_q):
      sumo_q.append(choice)
      request.session['sumo_q'] = sumo_q

    return JsonResponse({ 'success': True })

def results(request, question_id):
  question = get_object_or_404(Question, pk=question_id)
  return JsonResponse({ 'results': json.loads(serializers.serialize('json', question.choice_set.all())) })