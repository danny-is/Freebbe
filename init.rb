require 'rubygems'
require 'sinatra'
require 'haml'
require 'ninesixty'
require 'json'
require 'model/Frebbe'
require 'system_timer'


configure :production  do
 
    Frebbe.connectUrl
end

configure :development  do
  Frebbe.connect(:server=> 'localhost',:db=> 'frebbe')

end 

get '/' do
 haml :index  
end

get '/page' do
 haml :index
end

get '/slides' do
  parentId = params['parentId']
  presentations = Frebbe.find parentId
  return presentations
end 
 
post '/slide' do
  data = params['data']
  opp = URI.decode(data)
  opp1 =JSON.parse(opp)
  return Frebbe.insert(opp1).to_json
end

get '/slide/delete' do
  itemId = params['itemId']
  parentId = params['parentId']
  
  return Frebbe.delete(itemId,parentId)
end

def render_file(filename)
  contents = File.read('views/'+filename+'.haml')
  Haml::Engine.new(contents).render
end