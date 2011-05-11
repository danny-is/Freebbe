require 'rubygems'
require 'mongo'

module Frebbe
  class << self
    def connect(config)
      @db = Mongo::Connection.new(config[:server],config[:port] || 27017).db(config[:db])
      @pres = @db.collection("presentations")
    end
    
    def connectUrl()
      uri = URI.parse(ENV['MONGOHQ_URL'])
      conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
      @db = conn.db(uri.path.gsub(/^\//, ''))
      @pres = @db.collection("presentations")
    end
    
    def insert(data)
      parents = data['parentIds']
      pids =[]
      parents.each{
        |parent| 
          p = BSON::ObjectId.from_string(parent.to_s);
          pids.push(p)
      }    
      data['parentIds'] = pids
      obj = @pres.insert(data)
      if pids.length > 0      
        #find all documents with _id in parents array and add to set children data._id
        str = BSON::ObjectId.from_string(obj.to_s)
        pids.each{ |parent| 
            @pres.update( {"_id" => parent } , { "$addToSet" =>  {"children" => str }}) 
        }
      end
      return data;
    end
    
    def delete(itemId,parentId)
      iid = BSON::ObjectId.from_string(itemId);
     
     if(parentId=='root')
       @pres.remove({:_id => iid})
     else       
         pid = BSON::ObjectId.from_string(parentId);
         @pres.update( {"_id" => pid } , { "$pull" => { "children" => iid }})
         @pres.remove({:_id => iid})
     end
     
     return 'ok'
      
     # @pres.remove { _id: id }
    end
    
    def find(search)
      puts 'search:' + search
        if(search =='root')
          search = []
        else
          search = BSON::ObjectId.from_string(search)
        
        end
      presentations = @pres.find({:parentIds => search }).to_a
     for presentation in presentations
        presentation['createdDate']=presentation['_id'].generation_time
      end
      return presentations.to_json
    end 
    
    
    
     
  end
end