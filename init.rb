require 'rubygems'
require 'sinatra'
require 'haml'
require 'ninesixty'
require 'json'
require 'model/Frebbe'

before do
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

get '/slide/:id' do
  id = params[:id]
  return Frebbe.delete(id)
end

def render_file(filename)
  contents = File.read('views/'+filename+'.haml')
  Haml::Engine.new(contents).render
end