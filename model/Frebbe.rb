require 'rubygems'
require 'mongo'

module Frebbe
  class << self
    def connect(config)
      @db = Mongo::Connection.new(config[:server],config[:port] || 27017).db(config[:db])
      @pres = @db.collection("presentations")
    end
    
    def insert(data)
      @pres.insert(data)
      return data;
    end
    
    def delete(id)
      str = BSON::ObjectId.from_string(id);
     return @pres.remove({:_id => str},{:save => true})
      
     # @pres.remove { _id: id }
    end
    
    def find(search)
        presentations = @pres.find({:parentIds => search }).to_a
      for presentation in presentations
        presentation['createdDate']=presentation['_id'].generation_time
      end
      return presentations.to_json
    end 
    
    
    
     
  end
end